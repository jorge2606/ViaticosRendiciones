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
    public class SolicitationSubsidyService : ISolicitationSubsidyService
    {
        private readonly DataContext _dataContext;
        private readonly IValidator<SolicitationSubsidyBaseDto> _fluentValidator;
        private IMapper _mapper; 

        public SolicitationSubsidyService(
            DataContext dataContext,
            IValidator<SolicitationSubsidyBaseDto> fluentValidator,
            IMapper mapper)
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
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
                CostCommunication = subsidy.CostCommunication,
                UserId = subsidy.UserId,
                User = _dataContext.Users.FirstOrDefault(x => x.Id == subsidy.UserId),
                Transport = _dataContext.Transports.FirstOrDefault(x => x.Id == subsidy.TransportId),
                TransportId = subsidy.TransportId,
                Place = _dataContext.Places.FirstOrDefault(x => x.Id == subsidy.PlaceId),
                PlaceId = subsidy.PlaceId,
                Motive = _dataContext.Motives.FirstOrDefault(x => x.Id == subsidy.MotiveId),
                MotiveId = subsidy.MotiveId,
                Destinity = _dataContext.Destinities.FirstOrDefault(x => x.Id == subsidy.DestinityId),
                DestinityId = subsidy.DestinityId,
                CostMobility = subsidy.CostMobility,
                UnexpectedCircumstance = subsidy.UnexpectedCircumstance,
                CostFuel = subsidy.CostFuel
            };

            _dataContext.SolicitationSubsidies.Add(solicitationSubsidy);
            _dataContext.SaveChanges();

            return new ServiceResult<CreateSolicitationSubsidyDto>(_mapper.Map<CreateSolicitationSubsidyDto>(solicitationSubsidy));
        }

    }
}
