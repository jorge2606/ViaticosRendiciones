using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using VR.Data.Model;
using VR.Data.Model.ModelStoreProcedure;
using VR.Dto.User;

namespace VR.Dto
{

    public class SolicitationSubsidyValidator : AbstractValidator<SolicitationSubsidyBaseDto>
    {
        public SolicitationSubsidyValidator()
        {
            RuleFor(x => x.Motive).NotEmpty().WithName("Motivo");
            RuleFor(x => x.Total).NotNull().WithName("Total");
        }
    }

    public class SolicitationSubsidyBaseDto
    {
        public Guid Id { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        public List<ExpenditureDto> Expenditures { set; get; }
        public List<DestinyBaseDto> Destinies { set; get; }
        public Decimal AdvanceCategory { set; get; }
        public Decimal PercentageCodeLiquidation { set; get; }

        public DateTime CreateDate { set; get; }
        public Guid UserId { set; get; }
        public UserDto User { set; get; }
    }

    public class SolicitationObjectsSubsidyBaseDto : SolicitationSubsidyBaseDto
    {
        public string UserUserName { set; get; }
    }

    public class CreateSolicitationSubsidyDto : SolicitationSubsidyBaseDto { }

    public class UpdateSolicitationSubsidyDto : SolicitationSubsidyBaseDto { }

    public class DeleteSolicitationSubsidyDto
    {
        public Guid Id { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        public Guid UserId { set; get; }

    }

    public class FindByIdSolicitationSubsidyDto
    {
        public Guid Id { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        public List<ExpenditureFromSolicitationSubsidyByIdDto> Expenditures { set; get; }
        public List<DestinyFromSolicitationSubsidyFindByIdDto> Destinies { set; get; }
        public Guid UserId { set; get; }
        public UserDto User { set; get; }
    }

    public class AllSolicitationSubsidyDto
    {
        public Guid Id { set; get; }
        public string Motive { set; get; }
        public decimal Total { set; get; }
        public List<ExpenditureFromSolicitationSubsidyByIdDto> Expenditures { set; get; }
        public List<DestinyFromSolicitationSubsidyByIdDto> Destinies { set; get; }
        public Guid UserId { set; get; }
        public UserDto User { set; get; }
        public DateTime CreateDate { set; get; }
        public string State { set; get; }
        public string MotiveReject { set; get; }
        public string FileNumber { set; get; }
        public string FullName { set; get; }
        public string Localities { set; get; }
    }

    public class SolicitationIdDto
    {
        public Guid Id { set; get; }
        public string MotiveReject { set; get; }
        public string FileNumber { set; get; }
    }

    public class FilterSolicitationSubsidyDto
    {
        public int Page { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Dni { set; get; }
    }

    public class OverlapingDatesDto
    {
        public Guid Id { set; get; }
        public DateDto StartDate { set; get; }
        public DateDto EndDate { set; get; }
        public int Days { set; get; }
    }

    public class OverlapingDatesAndTransportsDto : OverlapingDatesDto
    {

        public DateTime StartDateDatetime { set; get; }
        public DateTime EndDateDatetime { set; get; }
        public Guid UserId { set; get; }
    }

    public class GetByIdSubsidyRpt
    {
        public List<Get_all_solicitationResult> SolicitationResult { set; get; }
        public List<Get_expendituresResult> ExpendituresResults { set; get; }
        
    }

}
