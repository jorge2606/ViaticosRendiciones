using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace VR.Dto
{
    public class ExpenditureValidator : AbstractValidator<ExpenditureBaseDto>
    {
        public ExpenditureValidator()
        {
            RuleFor(x => x.Description).NotEmpty().WithName("Descripción");
            RuleFor(x => x.Name).NotEmpty().WithName("Nombre");
            RuleFor(x => x.Name).MinimumLength(5).WithName("Nombre");
            RuleFor(x => x.Description).MinimumLength(5).WithName("Descripción");
            RuleFor(x => x.Name).MaximumLength(100).WithName("Nombre");
            RuleFor(x => x.Description).MaximumLength(100).WithName("Descripción");
        }
    }
    public class ExpenditureBaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class CreateExpenditureDto : ExpenditureBaseDto { }

    public class UpdateExpenditureDto : ExpenditureBaseDto { }

    public class DeleteExpenditureDto : ExpenditureBaseDto { }

    public class FindByIdExpenditureDto : ExpenditureBaseDto { }

    public class AllExpenditureDto : ExpenditureBaseDto { }



}
