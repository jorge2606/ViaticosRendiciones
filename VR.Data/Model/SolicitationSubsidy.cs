using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VR.Data.Model
{
    public class SolicitationSubsidy
    {
        public SolicitationSubsidy()
        {
            Destinies = new List<Destiny>();
            Expenditures = new List<Expenditure>();
            SolicitationStates = new List<SolicitationState>();
        }

        public Guid Id { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        [Column(TypeName = "Date")]
        public DateTime CreateDate { set; get; }

        [ForeignKey("User")]
        public Guid UserId { set; get; }

        public User User { set; get; }

        public List<Destiny> Destinies { get; set; }

        public List<Expenditure> Expenditures { get; set; }

        public List<SolicitationState> SolicitationStates { get; set; }
    }
}
