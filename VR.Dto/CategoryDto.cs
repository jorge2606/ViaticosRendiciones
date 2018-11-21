using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace VR.Dto
{
    public class CategoryValidator : AbstractValidator<CategoryBaseDto>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
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
}
