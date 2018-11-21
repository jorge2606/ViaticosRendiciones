using Service.Common.ServiceResult;
using System;
using System.Linq;
using AutoMapper;
using FluentValidation;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class DistributionService : IDistributionService
    {
        private readonly DataContext _distributionContext;
        private readonly IValidator<DistributionBaseDto> _fluentValidatorDistribution;
        private readonly IMapper _mapper;

        public DistributionService(DataContext distributionContext,
            IValidator<DistributionBaseDto> fluentValidatorDistribution,
            IMapper mapper)
        {
            _distributionContext = distributionContext;
            _fluentValidatorDistribution = fluentValidatorDistribution;
            _mapper = mapper;
        }


        public ServiceResult<CreateDistributionDto> CreateDistribution(CreateDistributionDto categoryDto)
        {
            var validation = _fluentValidatorDistribution.Validate(categoryDto);

            if (!validation.IsValid)
            {
                return new ServiceResult<CreateDistributionDto>(categoryDto);
            }

            Distribution newDistribution = new Distribution()
            {
                Id = new Guid(),
                Name = categoryDto.Name,
                Description = categoryDto.Description
            };

            _distributionContext.Add(newDistribution);
            _distributionContext.SaveChanges();
            return new ServiceResult<CreateDistributionDto>(categoryDto);
        }

        public ServiceResult<UpdateDistributionDto> UpdateDistribution(UpdateDistributionDto distributionDto)
        {
            var validateDistributionBaseDto = _fluentValidatorDistribution.Validate(distributionDto);
            var distributionModify = _distributionContext.Distributions.FirstOrDefault(x => x.Id == distributionDto.Id);

            if (validateDistributionBaseDto == null ||
                distributionModify == null)
            {
                return new ServiceResult<UpdateDistributionDto>(null);
            }

            distributionModify.Description = distributionDto.Description;
            distributionModify.Name = distributionDto.Name;

            _distributionContext.Distributions.Update(distributionModify);
            _distributionContext.SaveChanges();

            return new ServiceResult<UpdateDistributionDto>(distributionDto);
        }

        public ServiceResult<FindByIdDistributionDto> FindByIdDistribution(Guid id)
        {
            var distribution = _distributionContext.Distributions.FirstOrDefault(x => x.Id == id);

            if (distribution == null)
            {
                return new ServiceResult<FindByIdDistributionDto>(null);
            }

            return new ServiceResult<FindByIdDistributionDto>(_mapper.Map<FindByIdDistributionDto>(distribution));
        }

        public ServiceResult<DeleteDistributionDto> DeleteDistribution(Guid distributionId)
        {
            var distribution = _distributionContext.Distributions.FirstOrDefault(x => x.Id == distributionId);

            if (distribution == null)
            {
                return new ServiceResult<DeleteDistributionDto>(null);
            }

            _distributionContext.Remove(distribution);
            _distributionContext.SaveChanges();

            return new ServiceResult<DeleteDistributionDto>(_mapper.Map<DeleteDistributionDto>(distribution));
        }

    }
}
