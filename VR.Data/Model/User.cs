using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace VR.Data.Model
{
    public class User : IdentityUser<Guid>
    {
        public int Dni { set; get; }
        
        [ForeignKey("Distribution")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid? DistributionId { set; get; }
        public Distribution Distribution { set; get; }
    }
}