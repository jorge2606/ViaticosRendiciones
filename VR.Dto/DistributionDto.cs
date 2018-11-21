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
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
        }
    }

    public class DistributionBaseDto
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
    }

    public class CreateDistributionDto : DistributionBaseDto { }

    public class UpdateDistributionDto : DistributionBaseDto { }

    public class AllDistributionDto : DistributionBaseDto { }

    public class DeleteDistributionDto : DistributionBaseDto { }

    public class FindByIdDistributionDto : DistributionBaseDto { }

}
