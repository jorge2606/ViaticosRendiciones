using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace VR.Dto
{
    public class DistributionValidator : AbstractValidator<DistributionBaseDto>
    {
        public DistributionValidator()
        {
            RuleFor(x => x.Description).NotEmpty().WithMessage("Descripción no debería estar vacío.");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Nombre no debería estar vacío.");
            RuleFor(x => x.Name).MinimumLength(5);
            RuleFor(x => x.Description).MinimumLength(5);
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(100);
        }
    }

    public class DistributionBaseDto
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public Guid OrganismId { set; get; }
    }

    public class CreateDistributionDto : DistributionBaseDto { }

    public class UpdateDistributionDto : DistributionBaseDto { }

    public class AllDistributionDto : DistributionBaseDto { }

    public class DeleteDistributionDto : DistributionBaseDto { }

    public class FindByIdDistributionDto : DistributionBaseDto { }

}
