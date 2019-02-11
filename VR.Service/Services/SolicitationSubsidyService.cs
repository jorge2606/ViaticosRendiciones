﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
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
                    //SolicitationSubsidyId = solicitationSubsidy.Id,
                    SolicitationSubsidy = solicitationSubsidy,
                    Amount = expenditure.Amount,
                    ExpenditureTypeId = expenditure.ExpenditureTypeId
                };
                _dataContext.Expenditures.Add(newExpenditure);
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
                newDestiny.SolicitationSubsidy = solicitationSubsidy;
                newDestiny.Days = destiny.Days;
                newDestiny.StartDate = DateTime.Parse(destiny.StartDate.Day.ToString() + "/" + destiny.StartDate.Month.ToString() + "/" + destiny.StartDate.Year.ToString());
                newDestiny.ProvinceId = destiny.ProvinceId;
                newDestiny.AdvanceCategory = destiny.AdvanceCategory;
                newDestiny.PercentageCodeLiquidation = destiny.PercentageCodeLiquidation;
                if (find == null)
                {
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
                    //el agente no puede modificar los destinos
                    _dataContext.Destinies.Update(newDestiny);
                }
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
                newExpenditure.SolicitationSubsidy = solicitationSubsidy;
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

            }

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
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x => x.Id == id);

            if (find == null)
            {
                return new ServiceResult<FindByIdSolicitationSubsidyDto>(null);
            }

            return new ServiceResult<FindByIdSolicitationSubsidyDto>(
                _mapper.Map<FindByIdSolicitationSubsidyDto>(find));
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

            var headTable = "<table>"+
                "<thead>"+
                "<tr>"+
                    "<th>Fecha</th>"+
                    "<th> Pais </ th > "+
                    "<th> Province </th> "+
                    "<th> Localidades </th> "+
                    "<th> Categoría </th> " +
                    "<th> Transporte </th> " +
                    "<th> Dias </th> " +
                "</tr>" +
                "</thead>" +
                            "<tbody>";
            var row = "";

            foreach (var x in solicitation.Destinies)
            {
                var countryName = "-";
                var provinceName = "-";
                var cityName = "-";

                if (x.Country != null)
                {
                    countryName = x.Country.Name;
                }

                if (x.Province != null && x.City != null)
                {
                    provinceName = x.Province.Name;
                    cityName = x.City.Name;
                }

                row = row + "<tr>" +
                          "<td>" + x.StartDate.Day+"/"+ x.StartDate.Month+"/"+ x.StartDate.Year + "</td>" +
                          "<td>" + countryName + "</td>" +
                          "<td>" + provinceName + "</td>" +
                          "<td>" + cityName + "</td>" +
                          "<td>" + x.Category.Name + "</td>" +
                          "<td>" + x.Transport.Brand + " - " + x.Transport.Model + "</td>" +
                          "<td>" + x.Days + "</td>" +
                      "</tr>";
            }
            var TableDestinies = headTable + row + "</tbody></table>";

            var headTableExp = "<table>" +
                            "<thead>" +
                                "<tr>" +
                                    "<th> Gasto </th>" +
                                    "<th> Descripción </ th > " +
                                    "<th> Importe </th> " +
                                "</tr>" +
                            "</thead>" +
                            "<tbody>";
            var rowExp = "";
            foreach (var x in solicitation.Expenditures)
            {
                rowExp = rowExp + "<tr>" +
                      "<td>" + x.ExpenditureType.Name + "</td>" +
                      "<td>" + x.Description + "</td>" +
                      "<td>" + x.Amount + "</td>" +
                      "</tr>";
            }
            var tableExpenditures = headTableExp + rowExp + "</tbody></table>";

            var url = string.Format("http://localhost:4200/SolicitationSubsidy/confirm/{0}",solicitation.Id);

            var html = "<body>" +
                        "<head>" +
                            "<body>" +
                                 "<p>" +
                                    "Hola "+ supervisorsLastName+", "+supervisorsFirstName+"<br>"+
                                        "El Agente "+userLastName +", "+userFirstName+" ha enviado la solicitud de un viatico."+
                                        TableDestinies
                                        +"<br>" +
                                        tableExpenditures+
                                    "Saludos" +
                                 "</p> <br>" +
                                " <a href='"+url+"'> Ingresar </a> " +
                            "</body>" +
                        "</head>" +
                       "</body>";
            await _emailSender.SendEmailAsync(emailSupervisor, "Solicitud de Viatico", html);

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
                    Tittle = "solicitud de un viatico",
                    TextData = "El Agente " + userLastName + ", " + userFirstName + " " +
                               "Ha enviado la solicitud de un viatico. ",
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

            SolicitationState solicitationState = new SolicitationState()
            {
                Id = new Guid(),
                SolicitationSubsidy = solicitation,
                ChangeDate = DateTime.Now,
                StateId = State.Accepted
            };

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Su solicitud de viático fue aceptada",
                    TextData = "Su Solicitud de viático fue aceptada",
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

            _notificationService.Create(
                new CreateNotificationDto()
                {
                    Tittle = "Su solicitud de viático fue rechazada",
                    TextData = "Su solicitud de viático fue rechazada",
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
                .OrderByDescending(x => x.ChangeDate)
                .FirstOrDefault(x => x.SolicitationSubsidyId == solicitationId).State.Description;
            return new ServiceResult<string>(result);
        }

    }
}
