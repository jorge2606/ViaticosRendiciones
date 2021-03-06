﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Service.Common.Extensions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class TransportService : ITransportService
    {
        private readonly DataContext _dataContext;
        private readonly IValidator<TransportBaseDto> _fluentValidator;
        private readonly IMapper _mapper;
        private readonly ISolicitationSubsidyService _solicitationSubsidyService;

        public TransportService(
            DataContext dataContext, 
            IValidator<TransportBaseDto> fluentValidator,
            IMapper mapper,
            ISolicitationSubsidyService solicitationSubsidyService)
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
            _solicitationSubsidyService = solicitationSubsidyService;
        }

        public ServiceResult<Boolean> CarIsBeingUsedByOtherSolicitation(
            CarIsBeingUsedByOtherSolicitation transport
            )
        {
            var startDate = DateTime.Parse(transport.StartDate.Day + "/" + transport.StartDate.Month + "/" + transport.StartDate.Year);
            var endDate = DateTime.Parse(transport.StartDate.Day + "/" + transport.StartDate.Month + "/" + transport.StartDate.Year)
                .AddDays(transport.Days);

            //coninciden en la fecha y el transporte.
            var destinies = _dataContext.Destinies
                .Include(c => c.SolicitationSubsidy)
                .Where( x => 
                    x.TransportId == transport.Id && 
                    !(x.StartDate.AddDays(x.Days) < startDate || x.StartDate > endDate)
                );
            
            var resultDates = _solicitationSubsidyService.OverlapingDates(new OverlapingDatesAndTransportsDto()
            {
                Days = transport.Days,
                StartDateDatetime = startDate,
                EndDateDatetime = endDate,
                UserId = transport.UserId
            });
            
            foreach (var destiny in destinies)
            {
                
                var stateSolicitation = _dataContext.SolicitationStates
                    .Include(x => x.State)
                    .Include(s => s.SolicitationSubsidy)
                    .Where(x => x.SolicitationSubsidyId == destiny.SolicitationSubsidyId)
                    .OrderByDescending(q => q.ChangeDate).FirstOrDefault();//obtengo el estado de la solicitud

                //si el estado de la solicitud, no es reintegro, no es comisión
                //almacenada en la DB fue enviada o aceptada
                if ( (stateSolicitation.State.Id == State.Sent || stateSolicitation.State.Id == State.Accepted) 
                     && !destiny.SolicitationSubsidy.IsRefund
                     && !stateSolicitation.SolicitationSubsidy.IsCommission)
                {
                    
                    if (!resultDates.Response)
                    {
                        var transp = _dataContext.Transports.FirstOrDefault(c => c.Id == destiny.TransportId);
                        resultDates = new ServiceResult<bool>(true);
                        resultDates.AddError(NotificationType.Error.ToString(),
                            "El transporte " + transp.Brand + "-" + transp.Model + " ya fue solicitado.");
                    }
                }//si es destino almacenado actualmente es una comisión.
                else if ((stateSolicitation.State.Id == State.Sent || stateSolicitation.State.Id == State.Accepted)
                          && !destiny.SolicitationSubsidy.IsRefund
                          && stateSolicitation.SolicitationSubsidy.IsCommission)
                {
                    //pregunto si el usuario es parte de esa comisión.
                    var solicitationUser = _dataContext.SolicitationSubsidies
                        .Where(x => x.UserId == transport.UserId 
                                    && x.IsCommission 
                                    && x.RandomKey.Equals(stateSolicitation.SolicitationSubsidy.RandomKey)
                              ).ToList();
                    //no es parte de la comision, ni es un reintegro.
                    if (solicitationUser.Count == 0)
                    {
                        var transp = _dataContext.Transports.FirstOrDefault(c => c.Id == destiny.TransportId);
                        resultDates.AddError(NotificationType.Error.ToString(),"El transporte "+ transp.Brand+ "-" +transp.Model+" ya fue solicitado.");
                    }

                }
            }

            return resultDates;
        }

        public List<ServiceResult<bool>> CarIsBeingUsedByOtherSolicitationById(Guid solicitationId)
        {
            var result = new List<ServiceResult<bool>>();

            var solicitation = _dataContext
                .SolicitationSubsidies
                .Include(x => x.Destinies)
                .FirstOrDefault(x => x.Id == solicitationId);

            if (solicitation == null)
            {
                var exist = new ServiceResult<bool>();
                exist.AddError(NotificationType.Error.ToString(), "Esta solicitud no existe.");
                result.Add(exist);
                return result;
            }

            foreach (var dest in solicitation.Destinies)
            {
                var resultMethod = CarIsBeingUsedByOtherSolicitation(new CarIsBeingUsedByOtherSolicitation()
                {
                    Id = dest.TransportId,
                    Days = dest.Days,
                    StartDate = new DateDto() { Day = dest.StartDate.Day, Month = dest.StartDate.Month, Year = dest.StartDate.Year }
                });

                if (resultMethod.Response)
                {
                    result.Add(resultMethod);
                }
            }

            return result;
        }


        public ServiceResult<CreateTransportDto> CreateTransport(CreateTransportDto transportDto)
        {
            var validator = _fluentValidator.Validate(transportDto);

            if (!validator.IsValid)
            {
                return _mapper.Map<ServiceResult<CreateTransportDto>>(validator.ToServiceResult<CreateTransportDto>(null));
            }

            Transport newTransport = new Transport()
            {
                Id = new Guid(),
                Model = transportDto.Model,
                CarPlate = transportDto.CarPlate,
                Type = transportDto.Type,
                Brand = transportDto.Brand
            };

            _dataContext.Transports.Add(newTransport);
            _dataContext.SaveChanges();

            return new ServiceResult<CreateTransportDto>(transportDto);
        }

        public ServiceResult<UpdateTransportDto> UpdateTransport(UpdateTransportDto updateTransport)
        {
            var validator = _fluentValidator.Validate(updateTransport);

            if (!validator.IsValid)
            {
                return _mapper.Map< ServiceResult<UpdateTransportDto> >( validator.ToServiceResult<UpdateTransportDto>(null) );
            }

            Transport updateTran = new Transport()
            {
                Id = updateTransport.Id,
                Model = updateTransport.Model,
                Brand = updateTransport.Brand,
                CarPlate = updateTransport.CarPlate,
                Type = updateTransport.Type
            };

            _dataContext.Transports.Update(updateTran);
            _dataContext.SaveChanges();

            return new ServiceResult<UpdateTransportDto>(updateTransport);
        }

        public ServiceResult<FindByIdTransportDto> FindByIdTransport(Guid transportId)
        {
            var findTransport = _dataContext.Transports
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x =>x.Id == transportId);

            if(findTransport == null)
            {
                return new ServiceResult<FindByIdTransportDto>(null);
            }

            return new ServiceResult<FindByIdTransportDto>(_mapper.Map<FindByIdTransportDto>(findTransport));
        }

        public ServiceResult<DeleteTransportDto> DeleteTransport(Guid idTransport)
        {
            var deleteTransport = _dataContext.Transports.FirstOrDefault(x => x.Id == idTransport);

            if (deleteTransport == null)
            {
                return new ServiceResult<DeleteTransportDto>(null);
            }

            deleteTransport.IsDeleted = true;
            _dataContext.Transports.Update(deleteTransport);
            _dataContext.SaveChanges();

            return new ServiceResult<DeleteTransportDto>( _mapper.Map<DeleteTransportDto>(deleteTransport) );
        }

        public ServiceResult<List<GetAllTransportDto>> GetAllTransport()
        {
            return new ServiceResult<List<GetAllTransportDto>>(
               _mapper.Map<List<GetAllTransportDto>>(
                   _dataContext.Transports
                       .Where(x => x.IsDeleted != true)
                       .ToList()
                   )
               );
        }


    }
}
