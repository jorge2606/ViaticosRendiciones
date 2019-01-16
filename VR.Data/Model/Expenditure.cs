using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VR.Data.Model
{
    public class Expenditure
    {
        public Guid Id { set; get; }
        public decimal Amount { set; get; }
        public string Description { set; get; }

        [ForeignKey("SolicitationSubsidy")]
        public Guid SolicitationSubsidyId { set; get; }
        [ForeignKey("ExpenditureType")]
        public Guid ExpenditureTypeId { set; get; }

        public SolicitationSubsidy SolicitationSubsidy { set; get; }
        public ExpenditureType ExpenditureType { set; get; }
    }
}
