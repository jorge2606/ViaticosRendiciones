﻿using System;
using Microsoft.AspNetCore.Http;
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

        public ImageDto ImageDto { set; get; }
        public string UrlImage { set; get; }
        public Decimal AccountedForAmount { set; get; }
    }

    public class ExpenditureMapperDto
    {
        public string ExpenditureDescription { set; get; }
    }

    //AccountFor
    public class ExpenditureFromSolicitationSubsidyByIdDto
    {
        public Guid Id { set; get; }
        public decimal Amount { set; get; }
        public string Description { set; get; }
        public string ExpenditureTypeName { set; get; }
        public decimal? AccountedForAmount { set; get; }
        public Guid SolicitationSubsidyId { set; get; }
        public Guid ExpenditureTypeId { set; get; }
        public string UrlImage { set; get; }

    }

    //SolicitationSubcidy
    public class ExpenditureFromOnlySolicitationSubsidyByIdDto
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

    public class ImageDto
    {
        public DateTime LastModifiedDate { get; set; } 
        public string TypLastModified { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public string Type { get; set; }
        public string WebkitRelativePath { get; set; }
    }
    
}
