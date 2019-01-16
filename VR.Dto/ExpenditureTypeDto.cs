using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace VR.Dto
{
    public class ExpenditureTypeValidator : AbstractValidator<ExpenditureTypeBaseDto>
    {
        public ExpenditureTypeValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithName("Nombre");
            RuleFor(x => x.Name).MinimumLength(5).WithName("Nombre");
            RuleFor(x => x.Name).MaximumLength(100).WithName("Nombre");
        }
    }
    public class ExpenditureTypeBaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class CreateExpenditureTypeDto : ExpenditureTypeBaseDto { }

    public class UpdateExpenditureTypeDto : ExpenditureTypeBaseDto { }

    public class DeleteExpenditureTypeDto : ExpenditureTypeBaseDto { }

    public class FindByIdExpenditureTypeDto : ExpenditureTypeBaseDto { }

    public class AllExpenditureTypeDto : ExpenditureTypeBaseDto { }



}
