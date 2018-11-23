﻿using System;
using System.Linq;
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
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _categoryContext;
        private readonly IValidator<CategoryBaseDto> _fluentValidatorCategory;
        private readonly IMapper _mapper;

        public CategoryService(DataContext categoryContext,
            IValidator<CategoryBaseDto> fluentValidatorCategory,
            IMapper mapper)
        {
            _categoryContext = categoryContext;
            _fluentValidatorCategory = fluentValidatorCategory;
            _mapper = mapper;
        }

        public ServiceResult<CreateCategoryDto> CreateCategory(CreateCategoryDto categoryDto)
        {
            var validateCategoryBaseDto = _fluentValidatorCategory.Validate(categoryDto);

            if (!validateCategoryBaseDto.IsValid)
            {
                return _mapper.Map<ServiceResult<CreateCategoryDto>>( (validateCategoryBaseDto.ToServiceResult<CreateCategoryDto>(null)) );
            }

            Category NewCategory = new Category()
            {
                Id = new Guid(),
                Name = categoryDto.Name,
                Description = categoryDto.Description,
                Delete = default(DateTime),
            };

            _categoryContext.Categories.Add(NewCategory);
            _categoryContext.SaveChanges();
            return new ServiceResult<CreateCategoryDto>(categoryDto);
        }

        public ServiceResult<UpdateCategoryDto> UpdateCategory(UpdateCategoryDto categoryDto)
        {
            var validateCategoryBaseDto = _fluentValidatorCategory.Validate(categoryDto);
            var userModify = _categoryContext.Categories.FirstOrDefault(x => x.Id == categoryDto.Id);

            if (!validateCategoryBaseDto.IsValid ||
                userModify == null)
            {
                return _mapper.Map<ServiceResult<UpdateCategoryDto>>( validateCategoryBaseDto.ToServiceResult<UpdateCategoryDto>(null) );
            }

            userModify.Description = categoryDto.Description;
            userModify.Name = categoryDto.Name;
            userModify.Delete = categoryDto.Delete;

            _categoryContext.Categories.Update(userModify);
            _categoryContext.SaveChanges();

            return new ServiceResult<UpdateCategoryDto>(categoryDto);
        }

        public ServiceResult<DeleteCategoryDto> DeleteCategory(Guid id)
        {
            var categoryToDelete = _categoryContext.Categories.FirstOrDefault(x => x.Id == id);

            if (categoryToDelete == null)
            {
                return new ServiceResult<DeleteCategoryDto>(null);
            }

            _categoryContext.Categories.Remove(categoryToDelete);
            _categoryContext.SaveChanges();

            return new ServiceResult<DeleteCategoryDto>();
        }

        public ServiceResult<FindByIdCategoryDto> FindByIdCategory(Guid id)
        {
            var categoryFound = _categoryContext.Categories.FirstOrDefault(x => x.Id == id);

            if (categoryFound == null)
            {
                return new ServiceResult<FindByIdCategoryDto>(null);
            }

           return new ServiceResult<FindByIdCategoryDto>(_mapper.Map<FindByIdCategoryDto>(categoryFound));
        }
    }
}
