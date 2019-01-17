using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc.Razor.Internal;
using Microsoft.EntityFrameworkCore;
using Service.Common;
using Service.Common.Extensions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class SolicitationSubsidyService : ISolicitationSubsidyService
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<User> _userManager;
        private readonly IValidator<SolicitationSubsidyBaseDto> _fluentValidator;
        private IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly INotificationService _notificationService;

        public SolicitationSubsidyService(
            DataContext dataContext,
            IValidator<SolicitationSubsidyBaseDto> fluentValidator,
            IMapper mapper,
            UserManager<User> userManager,
            IEmailSender emailSender,
            INotificationService notificationService)
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
            _userManager = userManager;
            _emailSender = emailSender;
            _notificationService = notificationService;
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
                CreateDate = DateTime.Today
            };
            _dataContext.SolicitationSubsidies.Add(solicitationSubsidy);
            //_dataContext.SaveChanges();

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
                    StartDate = DateTime.Parse(destiny.StartDate.Day.ToString()+"/"+ destiny.StartDate.Month.ToString()+"/"+ destiny.StartDate.Year.ToString()),
                    ProvinceId = destiny.ProvinceId
                };
                _dataContext.Destinies.Add(newDestiny);
                //_dataContext.SaveChanges();
            }

            foreach (var expenditure in subsidy.Expenditures)
            {
                 Expenditure newExpenditure = new Expenditure()
                 {
                     Id = expenditure.Id,
                     Description = expenditure.Description,
                     //SolicitationSubsidyId = solicitationSubsidy.Id,
                     SolicitationSubsidy = solicitationSubsidy,
                     Amount = expenditure.Amount,
                     ExpenditureTypeId = expenditure.ExpenditureTypeId
                 };
                _dataContext.Expenditures.Add(newExpenditure);
                //_dataContext.SaveChanges();
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
            _dataContext.SaveChanges();

            foreach (var destiny in subsidy.Destinies)
            {
                var find = _dataContext.Destinies.FirstOrDefault(x => x.Id == destiny.Id);
                var newDestiny = find;
                if (find == null)
                {
                    newDestiny = new Destiny();
                }
                newDestiny.TransportId = destiny.TransportId;
                newDestiny.CategoryId = destiny.CategoryId;
                newDestiny.CityId = destiny.CityId;
                newDestiny.CodeLiquidationId = destiny.CodeLiquidationId;
                newDestiny.CountryId = destiny.CountryId;
                newDestiny.SolicitationSubsidyId = solicitationSubsidy.Id;
                newDestiny.Days = destiny.Days;
                newDestiny.StartDate = DateTime.Parse(destiny.StartDate.Day.ToString()+"/"+destiny.StartDate.Month.ToString()+"/"+destiny.StartDate.Year.ToString());
                newDestiny.ProvinceId = destiny.ProvinceId;
                if (find == null)
                {
                    _dataContext.Destinies.Add(newDestiny);
                }
                else
                {
                    _dataContext.Destinies.Update(newDestiny);
                }
                
                _dataContext.SaveChanges();
            }

            foreach (var expenditure in subsidy.Expenditures)
            {
                var newExpenditure = new Expenditure();
                var exist = _dataContext.Expenditures.FirstOrDefault(x => x.Id == expenditure.Id);

                if (exist != null)
                {
                    newExpenditure = exist;
                }
                 

                newExpenditure.Description = expenditure.Description;
                newExpenditure.SolicitationSubsidyId = solicitationSubsidy.Id;
                newExpenditure.Amount = expenditure.Amount;
                newExpenditure.ExpenditureTypeId = expenditure.ExpenditureTypeId;

                if (exist == null)
                {
                    _dataContext.Expenditures.Add(newExpenditure);
                }
                else
                {
                    _dataContext.Expenditures.Update(newExpenditure);
                }
                _dataContext.SaveChanges();
            }


            return new ServiceResult<UpdateSolicitationSubsidyDto>(_mapper.Map<UpdateSolicitationSubsidyDto>(subsidy));
        }

        public ServiceResult<FindByIdSolicitationSubsidyDto> GetByIdSubsidyDto(Guid id)
        {
            var find = _dataContext.SolicitationSubsidies
                .Include(x => x.Destinies).ThenInclude(x => x.City)
                .Include(x => x.Destinies).ThenInclude(x => x.CodeLiquidation)
                .Include(x => x.Destinies).ThenInclude(x => x.Category)
                .Include(x => x.Destinies).ThenInclude(x => x.Country)
                .Include(x => x.Destinies).ThenInclude(x => x.Province)
                .Include(x => x.Destinies).ThenInclude(x => x.Transport)
                .Include(x => x.Expenditures).ThenInclude(x => x.ExpenditureType)
                .Include(x => x.User)
                .FirstOrDefault(x => x.Id == id);

            if (find == null)
            {
                return new ServiceResult<FindByIdSolicitationSubsidyDto>(null);
            }

            //FindByIdSolicitationSubsidyDto findByIdSolicitationSubsidyDto = new FindByIdSolicitationSubsidyDto()
            //{
            //    Id = find.Id,
            //    Motive = find.Motive,
            //    Total = find.Total,
            //    UserId = find.UserId
            //};

            return new ServiceResult<FindByIdSolicitationSubsidyDto>(_mapper.Map<FindByIdSolicitationSubsidyDto>(find));
        }

        public ServiceResult<DeleteSolicitationSubsidyDto> Delete(Guid id)
        {
            var delete = _dataContext.SolicitationSubsidies.FirstOrDefault(x => x.Id == id);
            if (delete != null)
            {
                _dataContext.SolicitationSubsidies.Remove(delete);
                _dataContext.SaveChanges();
            }

            return new ServiceResult<DeleteSolicitationSubsidyDto>(_mapper.Map<DeleteSolicitationSubsidyDto>(delete));
        }


        public async Task<ServiceResult<string>> SendSolicitationAsync(SolicitationIdDto solicitationDto)
        {
            var solicitation = _dataContext.SolicitationSubsidies
                .Include(user => user.User)
                .Include(destiny => destiny.Destinies).ThenInclude(country => country.Country)
                .Include(destiny => destiny.Destinies).ThenInclude(prov => prov.Province)
                .Include(destiny => destiny.Destinies).ThenInclude(city => city.City)
                .FirstOrDefault(x => x.Id == solicitationDto.Id);
            var supervisor = _dataContext.SupervisorUserAgents
                .Include(sup => sup.Supervisors)
                .FirstOrDefault(x => x.AgentId == solicitation.UserId);

            if (solicitation == null)
            {
                return new ServiceResult<string>("");
            }

            var emailSupervisor = supervisor.Supervisors.Email;
            var supervisorsLastName = supervisor.Supervisors.LastName;
            var supervisorsFirstName = supervisor.Supervisors.FirstName;
            var userLastName = solicitation.User.LastName;
            var userFirstName = solicitation.User.FirstName;

            var html = "";
            await _emailSender.SendEmailAsync(emailSupervisor, "Solicitud de Viatico", html);

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Today,
                StateId = State.Sent,
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "solicitud de un viatico",
                    TextData = "El Agente " + userLastName + ", " + userFirstName + " " +
                               "Ha enviado la solicitud de un viatico. " + "<br><br>",
                    UserId = solicitation.UserId,
                    CreationTime = DateTime.Today,
                    NotificationType = (int)NotificationType.Info,
                    CreatorUserId = solicitation.UserId,
                    LastModifierUserId = Guid.Empty,
                    EntityId = Guid.Empty,
                    LastModificationTime = DateTime.Today
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

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Accepted,
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

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Rejected,
                MotiveReject = solicitationDto.MotiveReject
            };

            _dataContext.SolicitationStates.Add(solicitationState);
            _dataContext.SaveChanges();

            return new ServiceResult<SolicitationIdDto>(solicitationDto);
        }

    }
}
