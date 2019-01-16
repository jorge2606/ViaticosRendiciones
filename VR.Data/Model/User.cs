using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace VR.Data.Model
{
    public class User : IdentityUser<Guid>
    {
        public int Dni { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public int PrefixCuil { set; get; }
        public int SuffixCuil { set; get; }

        [ForeignKey("Distribution")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid? DistributionId { set; get; }
        public Distribution Distribution { set; get; }
    }
}