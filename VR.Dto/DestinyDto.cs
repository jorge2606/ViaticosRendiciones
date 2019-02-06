﻿using System;
using System.Collections.Generic;
using System.Text;
using VR.Data.Model;

namespace VR.Dto
{
    public class DestinyBaseDto
    {
        public Guid Id { set; get; }
        public int Days { set; get; }
        public DateDto StartDate { set; get; }
        public Guid CategoryId { set; get; }
        public Guid? CityId { set; get; }
        public Guid CodeLiquidationId { set; get; }
        public Guid? CountryId { set; get; }
        public Guid? ProvinceId { set; get; }
        public Guid TransportId { set; get; }
        public Guid SolicitationSubsidyId { set; get; }
        public Decimal AdvanceCategory { set; get; }
        public Decimal PercentageCodeLiquidation { set; get; }

        public Category Category { set; get; }
        public CodeLiquidation CodeLiquidation { set; get; }
        public Country Country { set; get; }
        public Transport Transport { set; get; }
        public SolicitationSubsidy SolicitationSubsidy { set; get; }
        public City City { set; get; }
        public Province Province { set; get; }
        public List<SupplementaryCityDto> SupplementaryCities { set; get; }
    }

    public class CreateDetinyDto : DestinyBaseDto { }

    public class DestinyFromSolicitationSubsidyByIdDto
    {
        public Guid Id { set; get; }
        public int Days { set; get; }
        public Decimal AdvanceCategory { set; get; }
        public DateDto StartDate { set; get; }
        public Guid CategoryId { set; get; }
        public string CategoryName { set; get; }
        public Guid? CityId { set; get; }
        public string CityName { set; get; }
        public Guid CodeLiquidationId { set; get; }
        public Decimal PercentageCodeLiquidation { set; get; }
        public Guid? CountryId { set; get; }
        public string CountryName { set; get; }
        public Guid? ProvinceId { set; get; }
        public string ProvinceName { set; get; }
        public Guid TransportId { set; get; }
        public string TransportBrand { set; get; }
        public string TransportModel { set; get; }
        public Guid SolicitationSubsidyId { set; get; }
        public List<SupplementaryCityOnlyId> SupplementaryCities { set; get; }
    }
}
