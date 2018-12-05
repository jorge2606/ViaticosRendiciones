using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using FluentValidation;
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

        public TransportService(DataContext dataContext, IValidator<TransportBaseDto> fluentValidator,
            IMapper mapper)
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
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
            var findTransport = _dataContext.Transports.FirstOrDefault(x =>x.Id == transportId);

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

            _dataContext.Transports.Remove(deleteTransport);
            _dataContext.SaveChanges();

            return new ServiceResult<DeleteTransportDto>( _mapper.Map<DeleteTransportDto>(deleteTransport) );
        }

        public ServiceResult<List<GetAllTransportDto>> GetAllTransport()
        {
            return new ServiceResult<List<GetAllTransportDto>>(
               _mapper.Map<List<GetAllTransportDto>>(_dataContext.Transports.ToList())
               );
        }


    }
}
