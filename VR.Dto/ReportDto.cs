using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Dto
{
    public class ReportDto
    {
        public string TodayDate { set; get; }
        public string TotalLetter { set; get; }
    }

    public class ReportByDestiniesAndDatesDto
    {
        public Guid? CityId { set; get; }
        public Guid? CountryId { set; get; }
        public String EndDate { set; get; }
        public Guid? ProvinceId { set; get; }
        public String StartDate { set; get; }
    }
}
