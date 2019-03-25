using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RazorLight;
using Service.Common.Extensions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;
using File = VR.Data.Model.File;

namespace VR.Service.Services
{
    public class SolicitationSubsidyService : ISolicitationSubsidyService
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<User> _userManager;
        private readonly IValidator<SolicitationSubsidyBaseDto> _fluentValidator;
        private IMapper _mapper;
        private readonly IEmailService _emailSender;
        private readonly INotificationService _notificationService;
        public IConfiguration _configuration { get; }
        private IFileService _iFileService;
        public static string StaticFilesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles");

        public SolicitationSubsidyService(
            DataContext dataContext,
            IValidator<SolicitationSubsidyBaseDto> fluentValidator,
            IMapper mapper,
            UserManager<User> userManager,
            IEmailService emailSender,
            INotificationService notificationService,
            IConfiguration configuration,
            IFileService iFileService
            )
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
            _userManager = userManager;
            _emailSender = emailSender;
            _notificationService = notificationService;
            _configuration = configuration;
            _iFileService = iFileService;
        }

        public ServiceResult<CreateSolicitationSubsidyDto> Create(CreateSolicitationSubsidyDto subsidy)
        {
            var validate = _fluentValidator.Validate(subsidy);
            if (!validate.IsValid)
            {
                return _mapper.Map<ServiceResult<CreateSolicitationSubsidyDto>>(validate.ToServiceResult<CreateSolicitationSubsidyDto>(null));
            }

            SolicitationSubsidy solicitationSubsidy = new SolicitationSubsidy()
            {
                Id = new Guid(),
                UserId = subsidy.UserId,
                Motive = subsidy.Motive,
                Total = subsidy.Total,
                CreateDate = DateTime.Today,
                IsRefund = subsidy.IsRefund
            };

            _dataContext.SolicitationSubsidies.Add(solicitationSubsidy);

            foreach (var destiny in subsidy.Destinies)
            {
                Destiny newDestiny = new Destiny()
                {
                    Id = destiny.Id,
                    TransportId = destiny.TransportId,
                    CategoryId = destiny.CategoryId,
                    CityId = destiny.CityId,
                    CodeLiquidationId = destiny.CodeLiquidationId,
                    CountryId = destiny.CountryId,
                    //SolicitationSubsidyId = solicitationSubsidy.Id,
                    SolicitationSubsidy = solicitationSubsidy,
                    Days = destiny.Days,
                    DaysWeekEnd = destiny.DaysWeekEnd,
                    StartDate = DateTime.Parse(destiny.StartDate.Day.ToString() + "/" + destiny.StartDate.Month.ToString() + "/" + destiny.StartDate.Year.ToString()),
                    ProvinceId = destiny.ProvinceId,
                    AdvanceCategory = destiny.AdvanceCategory,
                    PercentageCodeLiquidation = destiny.PercentageCodeLiquidation
                };

                _dataContext.Destinies.Add(newDestiny);

                if (destiny.SupplementaryCities != null)
                {
                    foreach (var supCity in destiny.SupplementaryCities)
                    {
                        SupplementaryCity newSupplementaryCity = new SupplementaryCity()
                        {
                            Id = new Guid(),
                            CityId = supCity.CityId,
                            Destiny = newDestiny
                        };

                        _dataContext.SupplementaryCities.Add(newSupplementaryCity);
                    }
                }

            }

            foreach (var expenditure in subsidy.Expenditures)
            {
                Expenditure newExpenditure = new Expenditure()
                {
                    Id = new Guid(),
                    Description = expenditure.Description,
                    SolicitationSubsidy = solicitationSubsidy,
                    Amount = expenditure.Amount,
                    ExpenditureTypeId = expenditure.ExpenditureTypeId
                };

                _dataContext.Expenditures.Add(newExpenditure);

                if (solicitationSubsidy.IsRefund)
                {
                    string base64 = expenditure.UrlImage.Substring(expenditure.UrlImage.IndexOf(',') + 1);
                    byte[] data = Convert.FromBase64String(base64);
                    File newFile = new File()
                    {
                        Id = new Guid(),
                        MimeType = expenditure.ImageDto.Type,
                        ExpenditureId = newExpenditure.Id,
                        Image = data,
                        UserId = subsidy.UserId,
                        LastModifiedDate = new DateTime()

                    };

                    _dataContext.Files.Add(newFile);
                }

               
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitationSubsidy,
                ChangeDate = DateTime.Today,
                StateId = State.Pending,
            };

            _dataContext.SolicitationStates.Add(solicitationState);

            _dataContext.SaveChanges();

            return new ServiceResult<CreateSolicitationSubsidyDto>(_mapper.Map<CreateSolicitationSubsidyDto>(subsidy));
        }

        public ServiceResult<CreateSolicitationSubsidyDto> CreateAccountFor(CreateSolicitationSubsidyDto subsidy)
        {
            var validate = _fluentValidator.Validate(subsidy);
            if (!validate.IsValid)
            {
                return _mapper.Map<ServiceResult<CreateSolicitationSubsidyDto>>(validate.ToServiceResult<CreateSolicitationSubsidyDto>(null));
            }

            var solicitationSubsidy = _dataContext.SolicitationSubsidies.FirstOrDefault(v => v.Id == subsidy.Id);

            solicitationSubsidy.UserId = subsidy.UserId;
            solicitationSubsidy.Motive = subsidy.Motive;
            solicitationSubsidy.Total = subsidy.Total;
            if (solicitationSubsidy.FinalizeDate == null)
            {
                solicitationSubsidy.FinalizeDate = new DateTime(subsidy.FinalizeDate.Year, subsidy.FinalizeDate.Month, subsidy.FinalizeDate.Day);
            }
            

            _dataContext.SolicitationSubsidies.Update(solicitationSubsidy);

            foreach (var destiny in subsidy.Destinies)
            {
                var newDestiny = _dataContext.Destinies.FirstOrDefault(x => x.Id == destiny.Id);// en una rendicion no puede insertar ni remover una localidad
                newDestiny.AccountedForDays = destiny.AccountedForDays;

                _dataContext.Destinies.Update(newDestiny);

            }

            foreach (var expenditure in subsidy.Expenditures)
            {
                Expenditure newExpenditure = new Expenditure();
                var findExp = _dataContext.Expenditures.FirstOrDefault(q => q.Id == expenditure.Id);
                var imageExist = new File();

                if (findExp == null)
                {
                    newExpenditure.Id = new Guid();
                    newExpenditure.Description = expenditure.Description;
                    newExpenditure.SolicitationSubsidy = solicitationSubsidy;
                    newExpenditure.Amount = expenditure.Amount;
                    newExpenditure.ExpenditureTypeId = expenditure.ExpenditureTypeId;
                    newExpenditure.AccountedForAmount = expenditure.AccountedForAmount;
                    _dataContext.Expenditures.Add(newExpenditure);
                    imageExist = _dataContext.Files
                        .FirstOrDefault(p => p.ExpenditureId == newExpenditure.Id);
                }
                else
                {

                     findExp.AccountedForAmount = expenditure.AccountedForAmount;
                    _dataContext.Expenditures.Update(findExp);
                    imageExist = _dataContext.Files
                        .FirstOrDefault(p =>p.ExpenditureId == findExp.Id);
                }

                string base64 = expenditure.UrlImage.Substring(expenditure.UrlImage.IndexOf(',') + 1);
                byte[] data = Convert.FromBase64String(base64);



                if (imageExist == null)
                {
                    File newFile = new File()
                    {
                        Id = new Guid(),
                        MimeType = expenditure.ImageDto.Type,
                        ExpenditureId = ((findExp == null) ? newExpenditure.Id : expenditure.Id),
                        Image = data,
                        Size = expenditure.ImageDto.Size,
                        Name = expenditure.ImageDto.Name,
                        UserId = subsidy.UserId,
                        LastModifiedDate = new DateTime()

                    };

                    _dataContext.Files.Add(newFile);
                }

            }

            /**SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitationSubsidy,
                ChangeDate = DateTime.Today,
                StateId = State.Accounted,
            };

            _dataContext.SolicitationStates.Add(solicitationState);**/

            _dataContext.SaveChanges();

            return new ServiceResult<CreateSolicitationSubsidyDto>(_mapper.Map<CreateSolicitationSubsidyDto>(subsidy));
        }

        public ServiceResult<UpdateSolicitationSubsidyDto> Update(UpdateSolicitationSubsidyDto subsidy)
        {
            var validate = _fluentValidator.Validate(subsidy);
            if (!validate.IsValid)
            {
                return _mapper.Map<ServiceResult<UpdateSolicitationSubsidyDto>>(validate.ToServiceResult<UpdateSolicitationSubsidyDto>(null));
            }
            
            SolicitationSubsidy solicitationSubsidy = _dataContext.SolicitationSubsidies.FirstOrDefault(x => x.Id == subsidy.Id);
            if (solicitationSubsidy == null)
            {
                return new ServiceResult<UpdateSolicitationSubsidyDto>(null);
            }
            solicitationSubsidy.Motive = subsidy.Motive;
            solicitationSubsidy.Total = subsidy.Total;

            _dataContext.SolicitationSubsidies.Update(solicitationSubsidy);

            var destiniesToDelete = _dataContext.Destinies
                .Where(s => s.SolicitationSubsidyId == subsidy.Id)
                .ToList();

            if (subsidy.Destinies.Count() == 0)
            {
                _dataContext.Destinies.RemoveRange(destiniesToDelete);
            }
            else
            {
                foreach (var destiny in subsidy.Destinies)
                {
                    var find = _dataContext.Destinies.FirstOrDefault(x => x.Id == destiny.Id);
                    //creamos
                    if (destiny.Id.Equals(Guid.Empty))
                    {
                        var newDestiny = new Destiny();
                        newDestiny.TransportId = destiny.TransportId;
                        newDestiny.CategoryId = destiny.CategoryId;
                        newDestiny.CityId = destiny.CityId;
                        newDestiny.CodeLiquidationId = destiny.CodeLiquidationId;
                        newDestiny.CountryId = destiny.CountryId;
                        newDestiny.SolicitationSubsidy = solicitationSubsidy;
                        newDestiny.Days = destiny.Days;
                        newDestiny.StartDate = DateTime.Parse(destiny.StartDate.Day.ToString() + "/" + destiny.StartDate.Month.ToString() + "/" + destiny.StartDate.Year.ToString());
                        newDestiny.ProvinceId = destiny.ProvinceId;
                        newDestiny.AdvanceCategory = destiny.AdvanceCategory;
                        newDestiny.PercentageCodeLiquidation = destiny.PercentageCodeLiquidation;
                        if (destiny.SupplementaryCities != null)
                        {
                            foreach (var supCity in destiny.SupplementaryCities)
                            {
                                SupplementaryCity newSupplementaryCity = new SupplementaryCity()
                                {
                                    Id = new Guid(),
                                    CityId = supCity.CityId,
                                    Destiny = newDestiny
                                };

                                _dataContext.SupplementaryCities.Add(newSupplementaryCity);
                            }
                        }
                        _dataContext.Destinies.Add(newDestiny);

                    }
                    else
                    {
                        //sacamos de los destinos a ser eliminados
                        destiniesToDelete.Remove(find);
                    }

                }
            }

            var expendituresToDelete = _dataContext.Expenditures
                .Where(s => s.SolicitationSubsidyId == subsidy.Id)
                .ToList();

            if (subsidy.Expenditures.Count() == 0)
            {
                _dataContext.Expenditures.RemoveRange(expendituresToDelete);
            }else{

                foreach (var expenditure in subsidy.Expenditures)
                {
                    var exist = expendituresToDelete.FirstOrDefault(x => x.Id == expenditure.Id);
                    //si no existe pero tampoco tiene ID es porque acaba de ser creado por el usuario 
                    if (expenditure.Id.Equals(Guid.Empty))
                    {
                        var newExpenditure = new Expenditure();
                        newExpenditure.Description = expenditure.Description;
                        newExpenditure.SolicitationSubsidy = solicitationSubsidy;
                        newExpenditure.Amount = expenditure.Amount;
                        newExpenditure.ExpenditureTypeId = expenditure.ExpenditureTypeId;

                        _dataContext.Expenditures.Add(newExpenditure);

                        if (solicitationSubsidy.IsRefund && exist == null)
                        {
                            string base64 = expenditure.UrlImage.Substring(expenditure.UrlImage.IndexOf(',') + 1);
                            byte[] data = Convert.FromBase64String(base64);
                            File newFile = new File()
                            {
                                Id = new Guid(),
                                MimeType = expenditure.ImageDto.Type,
                                Name = expenditure.ImageDto.Name,
                                Size = expenditure.ImageDto.Size,
                                LastModified = expenditure.ImageDto.TypLastModified,
                                LastModifiedDate = expenditure.ImageDto.LastModifiedDate,
                                ExpenditureId = newExpenditure.Id,
                                Image = data,
                                UserId = subsidy.UserId
                            };

                            _dataContext.Files.Add(newFile);
                        }

                    }
                    else
                    {
                        //quitar de la lista el gasto que viene, al final solo quedaran los que fueron eliminados
                        //en el front-end
                        expendituresToDelete.Remove(exist);
                    }

                }
            }

            _dataContext.Destinies.RemoveRange(destiniesToDelete);
            _dataContext.Expenditures.RemoveRange(expendituresToDelete);
            _dataContext.SaveChanges();
            return new ServiceResult<UpdateSolicitationSubsidyDto>(_mapper.Map<UpdateSolicitationSubsidyDto>(subsidy));
        }

        public ServiceResult<FindByIdSolicitationSubsidyDto> GetByIdSubsidy(Guid id)
        {
            var find = _dataContext.SolicitationSubsidies
                .Include(x => x.Destinies).ThenInclude(x => x.City)
                .Include(x => x.Destinies).ThenInclude(x => x.CodeLiquidation)
                .Include(x => x.Destinies).ThenInclude(x => x.Category)
                .Include(x => x.Destinies).ThenInclude(x => x.Country)
                .Include(x => x.Destinies).ThenInclude(x => x.Province)
                .Include(x => x.Destinies).ThenInclude(x => x.Transport)
                .Include(x => x.Destinies).ThenInclude(x => x.SupplementaryCities).ThenInclude(x => x.City)
                .Include(x => x.Expenditures).ThenInclude(x => x.ExpenditureType)
                .Include(x => x.User).ThenInclude(c => c.Category)
                .Include(x => x.User).ThenInclude(c => c.Distribution)
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x => x.Id == id);

            if (find == null)
            {
                return new ServiceResult<FindByIdSolicitationSubsidyDto>(null);
            }

            return new ServiceResult<FindByIdSolicitationSubsidyDto>(
                _mapper.Map<FindByIdSolicitationSubsidyDto>(find));
        }

        public ServiceResult<FindByIdSolicitationSubsidyWhitStateDto> GetByIdSubsidyWhitState(Guid id)
        {
            var find = _dataContext.SolicitationSubsidies
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x => x.Id == id);
            var state = _dataContext.SolicitationStates
                .Include(c => c.State)
                .OrderBy(x => x.ChangeDate).FirstOrDefault()
                .State.Description;

            if (find == null)
            {
                return new ServiceResult<FindByIdSolicitationSubsidyWhitStateDto>(null);
            }

            return new ServiceResult<FindByIdSolicitationSubsidyWhitStateDto>(
                new FindByIdSolicitationSubsidyWhitStateDto()
                {
                    State = state,
                    FinalizeDate = find.FinalizeDate
                }
                );
        }

        public ServiceResult<GetByIdSubsidyRpt> GetByIdSubsidyRpt(Guid solicitationId)
        {
            var UnidadOperativa = _dataContext.Rpt_unidadOperativa(solicitationId);
            var Expenditures = _dataContext.RptExpenditures(solicitationId);
            return new ServiceResult<GetByIdSubsidyRpt>(new GetByIdSubsidyRpt()
            {
                ExpendituresResults = Expenditures,
                SolicitationResult = UnidadOperativa
            });
        }

        public ServiceResult<DeleteSolicitationSubsidyDto> Delete(Guid id)
        {
            var delete = _dataContext.SolicitationSubsidies.FirstOrDefault(x => x.Id == id);
            if (delete != null)
            {
                delete.IsDeleted = true;
                _dataContext.SolicitationSubsidies.Update(delete);
                _dataContext.SaveChanges();
            }

            return new ServiceResult<DeleteSolicitationSubsidyDto>(_mapper.Map<DeleteSolicitationSubsidyDto>(delete));
        }

        public ServiceResult<DeleteSolicitationSubsidyDto> FinalizeSubsidy(Guid id)
        {
            var finalizeSolicitation = _dataContext.SolicitationSubsidies
                .Include(x => x.Destinies)
                .Include(x => x.Expenditures)
                .FirstOrDefault(x => x.Id == id);

            if (finalizeSolicitation == null)
            {
                return new ServiceResult<DeleteSolicitationSubsidyDto>();
            }

            var dateThatSolicitationWasFinalize = finalizeSolicitation.FinalizeDate == null ? DateTime.Today : finalizeSolicitation.FinalizeDate;
            finalizeSolicitation.FinalizeDate = dateThatSolicitationWasFinalize;

            var minDateDestination = finalizeSolicitation.Destinies.OrderBy(x => x.StartDate).FirstOrDefault().StartDate;
            var amountDaysSubsidy = (minDateDestination - dateThatSolicitationWasFinalize)?.Days;
            decimal total = 0;
            var daysCont = 0;

            if (dateThatSolicitationWasFinalize?.CompareTo(minDateDestination) != -1) //si es mayor o igual
            {
                foreach (var destinations in finalizeSolicitation.Destinies)
                {
                    daysCont = daysCont + destinations.Days;

                    if (amountDaysSubsidy >= daysCont)//este destino cuenta como gasto
                    {
                        total = total + (destinations.Days * destinations.AdvanceCategory *
                                         destinations.PercentageCodeLiquidation);
                        amountDaysSubsidy = amountDaysSubsidy - destinations.Days;
                    }
                    else
                    {
                        total = total + (amountDaysSubsidy ?? 0 * destinations.AdvanceCategory *
                                         destinations.PercentageCodeLiquidation);
                        amountDaysSubsidy = amountDaysSubsidy - destinations.Days;//le calculo con los dias que sobraron

                    }

                }
            }

            foreach (var expenditures in finalizeSolicitation.Expenditures)
            {
                total = total + expenditures.Amount;
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = finalizeSolicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Finished//el agente puso fin a su viatico
            };
            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SolicitationSubsidies.Update(finalizeSolicitation);
            _dataContext.SaveChanges();

            return new ServiceResult<DeleteSolicitationSubsidyDto>(_mapper.Map<DeleteSolicitationSubsidyDto>(finalizeSolicitation));
        }


        public async Task<ServiceResult<string>> SendSolicitationAsync(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .Include(x => x.Expenditures).ThenInclude(q => q.ExpenditureType)
                .Include(destiny => destiny.Destinies).ThenInclude(country => country.Country)
                .Include(destiny => destiny.Destinies).ThenInclude(prov => prov.Province)
                .Include(destiny => destiny.Destinies).ThenInclude(city => city.City)
                .Include(destiny => destiny.Destinies).ThenInclude(q => q.Category)
                .Include(destiny => destiny.Destinies).ThenInclude(q => q.Transport)
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);


            var notifications = new ServiceResult<string>();
                
            if (solicitation == null)
            {
                notifications.AddError("error", "Esta solicitud ya no existe en la base de datos");
                return notifications;
            }

            var isRefundTextOrSolicitation = "solicitud de Víatico";

            if (solicitation.IsRefund)
            {
                isRefundTextOrSolicitation = "reintegro";
            }


            var supervisor = _dataContext.SupervisorUserAgents
                .Include(sup => sup.Supervisors)
                .FirstOrDefault(x => x.AgentId == solicitation.UserId);

            if (supervisor == null)
            {
                notifications.AddError("error", "Usted no tiene ningún supervisor asignado");
                return notifications;
            }

            if (solicitation == null)
            {
                return new ServiceResult<string>("");
            }

            var emailSupervisor = supervisor.Supervisors.Email;
            var supervisorsLastName = supervisor.Supervisors.LastName;
            var supervisorsFirstName = supervisor.Supervisors.FirstName;
            var userLastName = solicitation.User.LastName;
            var userFirstName = solicitation.User.FirstName;
            var url = string.Format(_configuration["AppSettings:localUrl"] +"/SolicitationSubsidy/agent/confirm/{0}",solicitation.Id);

            var solicitationForHtml = new SolicitationSubsidyForTemplateDto()
            {
                Id = solicitation.Id,
                Destinies = _mapper.Map<List<DestinyBaseDto>>(solicitation.Destinies),
                Expenditures = _mapper.Map<List<ExpenditureFromSolicitationSubsidyByIdDto>>(solicitation.Expenditures),
                User = _mapper.Map<UserDto>(solicitation.User),
                SolicitationStates = _mapper.Map<List<SolicitationStateDto>>(solicitation.SolicitationStates),
                FinalizeDate = solicitation.FinalizeDate,
                Motive = solicitation.Motive,
                CreateDate = solicitation.CreateDate,
                IsRefund = solicitation.IsRefund,
                IsDeleted = solicitation.IsDeleted,
                Url = url,
                SupervisorsFirstName = supervisorsFirstName,
                SupervisorsLastName = supervisorsLastName
        };

            string template = Path.Combine(StaticFilesDirectory,"Templates");
            var engine = new RazorLightEngineBuilder()
                .UseFilesystemProject(template)
                .UseMemoryCachingProvider()
                .Build();

            string result = await engine.CompileRenderAsync("Email/sendSolicitationSubsidy.cshtml", solicitationForHtml);

            var emailSended = await _emailSender.SendEmail(emailSupervisor, "Solicitud de "+ isRefundTextOrSolicitation, result);
            if (!(emailSended.StatusCode == HttpStatusCode.Accepted))
            {
                if (emailSended.StatusCode == HttpStatusCode.Unauthorized)
                {
                    notifications.AddError("error", "La clave api expiró , está mal escrito o es errónea");
                }
                if (solicitation.IsRefund)
                {
                    notifications.AddError("error", "La solicitud de reintegro no pudo ser enviada al correo del supervisor.");
                }
                else
                {
                    notifications.AddError("error", "La solicitud no pudo ser enviada al correo del supervisor.");
                }
                
                return notifications;
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Sent,
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = isRefundTextOrSolicitation,
                    TextData = "El Agente " + userLastName + ", " + userFirstName + " " +
                               "Ha enviado : "+ isRefundTextOrSolicitation,
                    UserId = supervisor.SupervisorId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitation.UserId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today,
                    SolicitationSubsidyId = solicitation.Id
                });
            _dataContext.SolicitationStates.Add(solicitationState);

            _dataContext.SaveChanges();

            return new ServiceResult<string>(supervisor.Supervisors.Email);
        }


        public async Task<ServiceResult<string>> SendAccuountForSolicitationToSupervisorAsync(SolicitationIdDto accountForSolicitation)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .Include(x => x.Expenditures).ThenInclude(q => q.ExpenditureType)
                .Include(destiny => destiny.Destinies).ThenInclude(country => country.Country)
                .Include(destiny => destiny.Destinies).ThenInclude(prov => prov.Province)
                .Include(destiny => destiny.Destinies).ThenInclude(city => city.City)
                .Include(destiny => destiny.Destinies).ThenInclude(q => q.Category)
                .Include(destiny => destiny.Destinies).ThenInclude(q => q.Transport)
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x => x.Id == accountForSolicitation.Id);


            var notifications = new ServiceResult<string>();

            if (solicitation == null)
            {
                notifications.AddError("error", "Esta solicitud ya no existe en la base de datos");
                return notifications;
            }


            var supervisor = _dataContext.SupervisorUserAgents
                .Include(sup => sup.Supervisors)
                .FirstOrDefault(x => x.AgentId == solicitation.UserId);

            if (supervisor == null)
            {
                notifications.AddError("error", "Usted no tiene ningún supervisor asignado");
                return notifications;
            }

            if (solicitation == null)
            {
                return new ServiceResult<string>("");
            }

            var emailSupervisor = supervisor.Supervisors.Email;
            var supervisorsLastName = supervisor.Supervisors.LastName;
            var supervisorsFirstName = supervisor.Supervisors.FirstName;
            var userLastName = solicitation.User.LastName;
            var userFirstName = solicitation.User.FirstName;

            var url = string.Format(_configuration["AppSettings:localUrl"] + "/SolicitationSubsidy/agent/confirm/{0}", solicitation.Id);

            var solicitationForHtml = new SolicitationSubsidyForTemplateDto()
            {
                Id = solicitation.Id,
                Destinies = _mapper.Map<List<DestinyBaseDto>>(solicitation.Destinies),
                Expenditures = _mapper.Map<List<ExpenditureFromSolicitationSubsidyByIdDto>>(solicitation.Expenditures),
                User = _mapper.Map<UserDto>(solicitation.User),
                SolicitationStates = _mapper.Map<List<SolicitationStateDto>>(solicitation.SolicitationStates),
                FinalizeDate = solicitation.FinalizeDate,
                Motive = solicitation.Motive,
                CreateDate = solicitation.CreateDate,
                IsRefund = solicitation.IsRefund,
                IsDeleted = solicitation.IsDeleted,
                Url = url,
                SupervisorsFirstName = supervisorsFirstName,
                SupervisorsLastName = supervisorsLastName
            };

            string template = Path.Combine(StaticFilesDirectory, "Templates");

            var engine = new RazorLightEngineBuilder()
                .UseFilesystemProject(template)
                .UseMemoryCachingProvider()
                .Build();

            string result = await engine.CompileRenderAsync("Email/sendAccountForSolicitation.cshtml", solicitationForHtml);

            var emailSended = await _emailSender.SendEmail(emailSupervisor, "rendición de una solicitud de viático", result);

            if (!(emailSended.StatusCode == HttpStatusCode.Accepted))
            {
                if (emailSended.StatusCode == HttpStatusCode.Unauthorized)
                {
                    notifications.AddError("error", "La clave api expiró , está mal escrito o es errónea");
                }

                notifications.AddError("error", "La rendición de una solicitud de viático no pudo ser enviada al correo del supervisor.");
                
                return notifications;
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Accounted,
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Rendición de una solicitud de viático",
                    TextData = "El Agente " + userLastName + ", " + userFirstName + " " +
                               "Ha enviado una : Rendición de una solicitud de viático",
                    UserId = supervisor.SupervisorId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitation.UserId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today,
                    SolicitationSubsidyId = solicitation.Id
                });
            _dataContext.SolicitationStates.Add(solicitationState);

            _dataContext.SaveChanges();

            return new ServiceResult<string>(supervisor.Supervisors.Email);
        }

        public ServiceResult<SolicitationIdDto> AceptedSolicitation(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);

            if (solicitation == null)
            {
                return new ServiceResult<SolicitationIdDto>(null);
            }
            var isRefundTextOrSolicitation = "solicitud de Víatico";

            if (solicitation.IsRefund)
            {
                isRefundTextOrSolicitation = "solicitud de reintegro";
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Accepted,
                SupervisorId = solicitationDto.SupervisorId
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Su "+ isRefundTextOrSolicitation + " fue aceptada",
                    TextData = "Su "+ isRefundTextOrSolicitation + " fue aceptada",
                    UserId = solicitation.UserId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitationDto.SupervisorId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today,
                    SolicitationSubsidyId = solicitation.Id
                });

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }

        public ServiceResult<SolicitationIdDto> AceptedMySolicitation(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);

            if (solicitation == null)
            {
                return new ServiceResult<SolicitationIdDto>(null);
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Accepted,
                SupervisorId = solicitationDto.SupervisorId
            };

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }

        public ServiceResult<SolicitationIdDto> AceptedAccountForSolicitation(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);

            if (solicitation == null)
            {
                return new ServiceResult<SolicitationIdDto>(null);
            }


            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.AccountForAcepted,
                SupervisorId = solicitationDto.SupervisorId
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Su rendición de una solicitud de viático fue aceptada",
                    TextData = "Su rendición de una solicitud de viático fue aceptada",
                    UserId = solicitation.UserId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitationDto.SupervisorId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today,
                    SolicitationSubsidyId = solicitation.Id
                });

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }

        public ServiceResult<SolicitationIdDto> AceptedMyAccountForSolicitation(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);

            if (solicitation == null)
            {
                return new ServiceResult<SolicitationIdDto>(null);
            }


            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.AccountForAcepted,
                SupervisorId = solicitationDto.SupervisorId
            };

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }

        public ServiceResult<SolicitationIdDto> RefusedSolicitation(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);

            if (solicitation == null)
            {
                return new ServiceResult<SolicitationIdDto>(null);
            }
            var isRefundTextOrSolicitation = "solicitud de Víatico";

            if (solicitation.IsRefund)
            {
                isRefundTextOrSolicitation = "reintegro";
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Rejected,
                MotiveReject = solicitationDto.MotiveReject
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Su "+ isRefundTextOrSolicitation + " fue rechazada",
                    TextData = "Su "+ isRefundTextOrSolicitation + " fue rechazada",
                    UserId = solicitation.UserId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitationDto.SupervisorId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today,
                    SolicitationSubsidyId = solicitation.Id
                });

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }

        public ServiceResult<SolicitationIdDto> RefusedAccountForSolicitation(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);

            if (solicitation == null)
            {
                return new ServiceResult<SolicitationIdDto>(null);
            }

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.AccountForRejected,
                MotiveReject = solicitationDto.MotiveReject
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Su rendición de una solicitud de viático fue rechazada",
                    TextData = "Su rendición de una solicitud de viático fue rechazada",
                    UserId = solicitation.UserId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitationDto.SupervisorId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today,
                    SolicitationSubsidyId = solicitation.Id
                });

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }


        public ServiceResult<Boolean> OverlapingDates(OverlapingDatesAndTransportsDto overlapingDates)
        {
            /**var SolicitationsDestinies = _dataContext.Destinies
                .Include(x => x.SolicitationSubsidy).ThenInclude(x => x.User)
                 .Where(
                 x => 
                    !(x.StartDate.AddDays(x.Days) < overlapingDates.StartDateDatetime || x.StartDate > overlapingDates.EndDateDatetime)
                     && 
                    x.SolicitationSubsidy.User.Id == overlapingDates.UserId
             );**/
            var SolicitationsDestinies = _dataContext.Overlaping_dates(
                 overlapingDates.StartDateDatetime, overlapingDates.EndDateDatetime, overlapingDates.UserId);
     
            if (SolicitationsDestinies)
            {
                ServiceResult<Boolean> notify = new ServiceResult<bool>(true);
                const NotificationType notificationType = NotificationType.Error;
                notify.AddError(notificationType.ToString(), "Las fechas estan solapadas");
                return notify;
            }

            return new ServiceResult<bool>(false);
        }

        public ServiceResult<Guid> SolicitationApprovedBySupervisorId(Guid Id)
        {
            return new ServiceResult<Guid>
            (
                _dataContext.SolicitationApprovedBySupervisorId(Id)
            ); 
        }

        public ServiceResult<string> WichStateSolicitation(Guid solicitationId)
        {
            var result = _dataContext.SolicitationStates
                .Include(x => x.State)
                .Where(x => x.SolicitationSubsidyId == solicitationId)
                .OrderByDescending(x => x.ChangeDate)
                .FirstOrDefault().State.Description;
            return new ServiceResult<string>(result);
        }


        public ServiceResult<bool> ValidateBeforeSendAccountFor(Guid solcitationId)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(x => x.Destinies)
                .ThenInclude(city => city.City)
                .ThenInclude(prov => prov.Province)
                .ThenInclude(country => country.Country) 
                .Include(x => x.Expenditures)
                .ThenInclude(expType => expType.ExpenditureType)
                .FirstOrDefault(x => x.Id == solcitationId);

            if (solicitation == null)
            {
                return new ServiceResult<bool>(false);
            }
            

            ServiceResult<bool> result = new ServiceResult<bool>();

            if (String.IsNullOrEmpty(solicitation.Motive))
            {
                result.AddNotification(NotificationType.Info, "El falta completar el campo 'motivo'");
                
            }

            foreach (var solicitationDestiny in solicitation.Destinies)
            {
                if (!solicitationDestiny.AccountedForDays.HasValue)
                {
                    var destiny = (solicitationDestiny.Country == null)
                        ? solicitationDestiny.Province.Name + " " + solicitationDestiny.City.Name : solicitationDestiny.Country.Name;

                    result.AddNotification(NotificationType.Info,"El falta completar los 'dias viajados' al destino "+ destiny);
                }
            }

            foreach (var expenditureDestination in solicitation.Expenditures)
            {
                if (!expenditureDestination.AccountedForAmount.HasValue)
                {
                    var exp = expenditureDestination.ExpenditureType.Name;
                    result.AddNotification(NotificationType.Info, "El falta completar el campo 'importe' al concepto '" + exp +"'");
                }

                var img = _dataContext.Files.FirstOrDefault(c => c.ExpenditureId == expenditureDestination.Id);

                if (img == null)
                {
                    var exp = expenditureDestination.ExpenditureType.Name;
                    result.AddNotification(NotificationType.Info, "El falta agregar una imagen de un comprobante al concepto '" + exp + "'");
                }
            }

            return result;
        }


        public ServiceResult<bool> ValidateBeforeSendAccountForFinalizeNormally(Guid solcitationId)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(x => x.Destinies)
                .ThenInclude(city => city.City)
                .ThenInclude(prov => prov.Province)
                .ThenInclude(country => country.Country)
                .Include(x => x.Expenditures)
                .ThenInclude(expType => expType.ExpenditureType)
                .FirstOrDefault(x => x.Id == solcitationId);

            if (solicitation == null)
            {
                return new ServiceResult<bool>(false);
            }


            ServiceResult<bool> result = new ServiceResult<bool>();

            if (String.IsNullOrEmpty(solicitation.Motive))
            {
                result.AddNotification(NotificationType.Info, "El falta completar el campo 'motivo'");

            }

            foreach (var expenditureDestination in solicitation.Expenditures)
            {
                if (!expenditureDestination.AccountedForAmount.HasValue)
                {
                    var exp = expenditureDestination.ExpenditureType.Name;
                    result.AddNotification(NotificationType.Info, "El falta completar el campo 'importe' al concepto '" + exp + "'");
                }

                var img = _dataContext.Files.FirstOrDefault(c => c.ExpenditureId == expenditureDestination.Id);

                if (img == null)
                {
                    var exp = expenditureDestination.ExpenditureType.Name;
                    result.AddNotification(NotificationType.Info, "El falta agregar una imagen de un comprobante al concepto '" + exp + "'");
                }
            }

            return result;
        }

    }
}
