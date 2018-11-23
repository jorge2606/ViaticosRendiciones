using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace VR.Dto
{
    public class OrganismValidator : AbstractValidator<OrganismBaseDto>
    {
        public OrganismValidator()
        {
            RuleFor(x => x.Description).NotEmpty().WithMessage("Descripción no debería estar vacío.");
            RuleFor(x => x.Name).NotEmpty().WithMessage("Nombre no debería estar vacío.");
            RuleFor(x => x.Name).MinimumLength(5);
            RuleFor(x => x.Description).MinimumLength(5);
            RuleFor(x => x.Name).MaximumLength(100);
            RuleFor(x => x.Description).MaximumLength(100);
        }
    }

    public class OrganismBaseDto
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
    }

    public class CreateOrganismDto : OrganismBaseDto { }

    public class UpdateOrganismDto : OrganismBaseDto { }

    public class DeleteOrganismDto : OrganismBaseDto { }

    public class FindByIdOrganismDto : OrganismBaseDto { }



}
