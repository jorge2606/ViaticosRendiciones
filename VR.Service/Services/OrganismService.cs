﻿using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Service.Common.Extensions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class OrganismService : IOrganismService
    {
        private readonly DataContext _dataContext;
        private readonly IValidator<OrganismBaseDto> _fluentValidator;
        private readonly IMapper _mapper;

        public OrganismService(DataContext dataContext, IValidator<OrganismBaseDto> fluentValidator,
                               IMapper mapper)
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
        }

        public ServiceResult<UpdateOrganismDto> UpdateOrganism(UpdateOrganismDto updateOrganism)
        {
            var validate = _fluentValidator.Validate(updateOrganism);

            if (!validate.IsValid)
            {
                return _mapper.Map<ServiceResult<UpdateOrganismDto>>(validate.ToServiceResult<UpdateOrganismDto>(null));
            }

            Organism newOrganism = new Organism()
            {
                Description = updateOrganism.Description,
                Name = updateOrganism.Name
            };

            _dataContext.Update(newOrganism);
            _dataContext.SaveChanges();

            return new ServiceResult<UpdateOrganismDto>(updateOrganism);
        }

        public ServiceResult<FindByIdOrganismDto> FindByIdOrganism(Guid id)
        {
            var find = _dataContext.Organisms.FirstOrDefault(x => x.Id == id);

            if (find == null)
            {
                return new ServiceResult<FindByIdOrganismDto>(null);
            }

            return new ServiceResult<FindByIdOrganismDto>(_mapper.Map<FindByIdOrganismDto>(find));
        }

        public ServiceResult<CreateOrganismDto> CreateOrganism(CreateOrganismDto organismDto)
        {
            var validate = _fluentValidator.Validate(organismDto);

            if (!validate.IsValid)
            {
                return _mapper.Map<ServiceResult<CreateOrganismDto>>(validate.ToServiceResult<CreateOrganismDto>(null));
            }

            Organism newOrganism = new Organism()
            {
                Id = new Guid(),
                Name = organismDto.Name,
                Description = organismDto.Description
            };
            _dataContext.Add(newOrganism);
            _dataContext.SaveChanges();

            return new ServiceResult<CreateOrganismDto>(organismDto);
        }

        public ServiceResult<DeleteOrganismDto> DeleteOrganism(Guid id)
        {
            var delete = _dataContext.Organisms.FirstOrDefault(x => x.Id == id);

            if (delete == null)
            {
                return new ServiceResult<DeleteOrganismDto>(null);
            }

            _dataContext.Remove(delete);
            _dataContext.SaveChanges();

            return new ServiceResult<DeleteOrganismDto>(_mapper.Map<DeleteOrganismDto>(delete));
        }

    }
}
