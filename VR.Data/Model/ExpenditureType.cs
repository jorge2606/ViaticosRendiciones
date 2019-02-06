using System;
using System.Collections.Generic;
using System.Text;
using VR.Data.Interfaces;

namespace VR.Data.Model
{
    public class ExpenditureType : IsDeletedInterface
    {
        public  Guid Id { set; get; }
        public string Name { set; get; }
        public Boolean IsDeleted { set; get; }
    }
}
