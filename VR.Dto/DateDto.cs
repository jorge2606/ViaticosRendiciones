using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Dto
{
    public class DateDto
    {
        public int Day { set; get; }
        public int Month { set; get; }
        public int Year { set; get; }

        public DateTime ToDateTime()
        {
            return new DateTime(this.Year, this.Month, this.Day);
        }
    }
    
}
