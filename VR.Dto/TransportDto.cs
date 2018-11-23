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
            RuleFor(x => x.Brand).NotEmpty().WithMessage("Marca no debería estar vacío.");
            RuleFor(x => x.Brand).MinimumLength(5);
            RuleFor(x => x.Brand).MaximumLength(100);

            RuleFor(x => x.Type).NotEmpty().WithMessage("Tipo no debería estar vacío.");
            RuleFor(x => x.Type).MinimumLength(5);
            RuleFor(x => x.Type).MaximumLength(100);

            RuleFor(x => x.Model).NotEmpty().WithMessage("Modelo no debería estar vacío.");
            RuleFor(x => x.Model).MinimumLength(5);
            RuleFor(x => x.Model).MaximumLength(100);

            RuleFor(x => x.CarPlate).NotEmpty().WithMessage("Patente no debería estar vacío.");
            RuleFor(x => x.CarPlate).MinimumLength(5);
            RuleFor(x => x.CarPlate).MaximumLength(100);

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
