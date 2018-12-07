using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Data.Model
{
    public class Province
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public DateTime CreatedDate { set; get; }
        public Boolean IsDeleted { set; get; }
    }
}
