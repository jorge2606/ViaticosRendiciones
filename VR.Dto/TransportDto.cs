using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Dto
{

    public class TransportValidator : AbstractValidator<TransportBaseDto>
    {
        public TransportValidator()
        {
            RuleFor(x => x.Brand)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(100)
                .WithName("Marca");

            RuleFor(x => x.Type)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(100)
                .WithName("Tipo");

            RuleFor(x => x.Model)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(100)
                .WithName("Modelo");

            RuleFor(x => x.CarPlate)
                .NotEmpty()
                .MinimumLength(5)
                .MaximumLength(100)
                .WithName("Patente");

        }
    }
    public class TransportBaseDto
    {
        public Guid Id { set; get; }
        public string Type { set; get; }
        public string Model { set; get; }
        public string Brand { set; get; }
        public string CarPlate { set; get; }
    }

    public class CreateTransportDto : TransportBaseDto { }

    public class UpdateTransportDto : TransportBaseDto { }

    public class DeleteTransportDto : TransportBaseDto { }

    public class FindByIdTransportDto : TransportBaseDto { }

}
