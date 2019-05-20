using System;
using System.Collections.Generic;
using System.Text;
using VR.Dto.User;

namespace VR.Dto
{
    public class ReportDto
    {
        public ReportDto()
        {
            TodayDate = "";
            TotalLetter = "";
        }
        public string TodayDate { set; get; }
        public string TotalLetter { set; get; }
    }

    public class ReportByDestiniesAndDatesDto
    {
        public Guid? CityId { set; get; }
        public Guid? CountryId { set; get; }
        public int EndDay { set; get; }
        public int EndMonth { set; get; }
        public int EndYear { set; get; }
        public DateDto EndDate { set; get; }
        public Guid? ProvinceId { set; get; }
        public DateDto StartDate { set; get; }
        public int StartDateDay { set; get; }
        public int StartDateMonth { set; get; }
        public int StartDateYear { set; get; }
    }

    public class UserAgentFilterDto : FilterBaseDto
    {
        public string FirstName { set; get; }
        public string LastName { set; get; }
    }
}
