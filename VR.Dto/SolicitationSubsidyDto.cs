﻿using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using VR.Data.Model;

namespace VR.Dto
{

    public class SolicitationSubsidyValidator : AbstractValidator<SolicitationSubsidyBaseDto>
    {
        public SolicitationSubsidyValidator()
        {
            RuleFor(x => x.CostMobility).NotEmpty().WithName("Costo de Mobilidad");
            RuleFor(x => x.CostFuel).NotEmpty().WithName("Costo de Combustible");
            RuleFor(x => x.CostCommunication).NotEmpty().WithName("Costo de Comunicación");
            RuleFor(x => x.UnexpectedCircumstance).NotEmpty().WithName("Imprevisto");
        }
    }

    public class SolicitationSubsidyBaseDto
    {
        public Guid Id { set; get; }
        public double CostMobility { set; get; }
        public double CostFuel { set; get; }
        public double CostCommunication { set; get; }
        public double UnexpectedCircumstance { set; get; }
        public Guid UserId { set; get; }
        public Guid PlaceId { set; get; }
        public Guid DestinyId { set; get; }
        public Guid TransportId { set; get; }
        public Guid MotiveId { set; get; }
    }

    public class SolicitationObjectsSubsidyBaseDto : SolicitationSubsidyBaseDto
    {
        public string DestinyDescription { set; get; }
        public string TransportDescription { set; get; }
        public string MotiveDescription { set; get; }
        public string UserUserName { set; get; }
        public string PlaceDescription { set; get; }
    }

    public class CreateSolicitationSubsidyDto : SolicitationSubsidyBaseDto { }

    public class UpdateSolicitationSubsidyDto : SolicitationSubsidyBaseDto { }

    public class DeleteSolicitationSubsidyDto : SolicitationSubsidyBaseDto { }

    public class FindByIdSolicitationSubsidyDto : SolicitationSubsidyBaseDto { }

    public class AllSolicitationSubsidyDto : SolicitationObjectsSubsidyBaseDto { }

    public class FilterSolicitationSubsidyDto
    {
        public int? Page { set; get; }
        public string UserName { set; get; }
        public Guid? PlaceId { set; get; }
        public Guid? DestinyId { set; get; }
        public Guid? TransportId { set; get; }
        public Guid? MotiveId { set; get; }
    }


}
