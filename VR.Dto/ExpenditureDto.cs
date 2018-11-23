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
            RuleFor(x => x.Description).NotEmpty().WithMessage("Descripción no debería estar vacío.");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Nombre no debería estar vacío.");
            RuleFor(x => x.Name).MinimumLength(5);
            RuleFor(x => x.Description).MinimumLength(5);
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(100);
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



}
