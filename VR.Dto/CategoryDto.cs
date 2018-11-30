using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using FluentValidation.Resources;

namespace VR.Dto
{
    public class CategoryValidator : AbstractValidator<CategoryBaseDto>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Description).NotEmpty().WithMessage("Descripción no debería estar vacío.");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Nombre no debería estar vacío.");
            RuleFor(x => x.Name).MinimumLength(5);
            RuleFor(x => x.Description).MinimumLength(5);
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(100);
        }
    }
    public class CategoryBaseDto
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public DateTime Delete { set; get; }
    }

    public class CreateCategoryDto : CategoryBaseDto { }

    public class UpdateCategoryDto : CategoryBaseDto { }

    public class AllCategoryDto : CategoryBaseDto { }

    public class DeleteCategoryDto : CategoryBaseDto { }

    public class FindByIdCategoryDto : CategoryBaseDto { }

    public class FilterCategoryDto
    {
        public int? Page { set; get; }
        public string Name { set; get; }
    }
}
