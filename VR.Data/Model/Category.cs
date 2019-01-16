using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VR.Data.Model
{
    public class Category
    {
        public Guid Id { set; get; }
        [StringLength(50)]
        public string Name { set; get; }
        [StringLength(250)]
        public string Description { set; get; }
        public decimal Advance { set; get; }
        public Boolean IsDeleted { set; get; }
    }
}
