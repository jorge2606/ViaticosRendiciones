using System;
using VR.Data.Model;

namespace VR.Dto
{
    public class ExpenditureDto
    {
        public Guid Id { set; get; }
        public decimal Amount { set; get; }
        public string Description { set; get; }
        
        public Guid SolicitationSubsidyId { set; get; }
        public Guid ExpenditureTypeId { set; get; }

        public SolicitationSubsidy SolicitationSubsidy { set; get; }
        public ExpenditureType ExpenditureType { set; get; }
    }

    public class ExpenditureMapperDto
    {
        public string ExpenditureDescription { set; get; }
    }

    public class ExpenditureFromSolicitationSubsidyByIdDto
    {
        public Guid Id { set; get; }
        public decimal Amount { set; get; }
        public string Description { set; get; }
        public string ExpenditureTypeName { set; get; }
        public Guid SolicitationSubsidyId { set; get; }
        public Guid ExpenditureTypeId { set; get; }

    }

    public class RptExpenditureDto
    {
        public string Concept { get; set; }
        public string Description { get; set; }
        public decimal SubTotal { get; set; }
    }


    
}
