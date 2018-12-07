using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VR.Data.Model
{
    public class Holiday
    {
        public Guid Id { set; get; }
        public string Description { set; get; }
        [Column(TypeName = "Date")]
        public DateTime Date { set; get; } 
    }
}
