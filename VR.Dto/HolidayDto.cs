using System;
using FluentValidation;

namespace VR.Dto
{
    public class HolidayValidator : AbstractValidator<HolidayBaseDto>
    {
        public HolidayValidator()
        {
            RuleFor(x => x.Date).NotEmpty().WithName("Fecha");
            RuleFor(x => x.Description).NotEmpty().WithName("Descripción");
        }
    }

    public class HolidayBaseDto
    {
        public Guid Id { set; get; }
        public string Description { set; get; }
        public DateTime Date { set; get; }
    }

    public class CreateHolidayDto : HolidayBaseDto { }

    public class AllHolidayDto : HolidayBaseDto { }

    public class UpdateHolidayDto : HolidayBaseDto { }

    public class DeleteHolidayDto : HolidayBaseDto { }

    public class FindByIdHolidayDto : HolidayBaseDto { }

    public class FilterHolidayDto
    {
        public int? Page { set; get; }
        public string Description { set; get; }
        public DateTime? Date { set; get; }
    }
}
