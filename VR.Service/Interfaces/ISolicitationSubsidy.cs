using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface ISolicitationSubsidyService
    {
        ServiceResult<CreateSolicitationSubsidyDto> Create(CreateSolicitationSubsidyDto subsidy);
        ServiceResult<CreateSolicitationSubsidyDto> CreateAccountFor(CreateSolicitationSubsidyDto subsidy);
        ServiceResult<FindByIdSolicitationSubsidyDto> GetByIdSubsidy(Guid id);
        ServiceResult<DeleteSolicitationSubsidyDto> Delete(Guid id);
        ServiceResult<DeleteSolicitationSubsidyDto> FinalizeSubsidy(Guid id);
        ServiceResult<UpdateSolicitationSubsidyDto> Update(UpdateSolicitationSubsidyDto subsidy);
        Task<ServiceResult<string>> SendSolicitationAsync(SolicitationIdDto solicitationdDto);
        Task<ServiceResult<string>> SendAccuountForSolicitationToSupervisorAsync(
            SolicitationIdDto accountForSolicitation);
        ServiceResult<SolicitationIdDto> AceptedSolicitation(SolicitationIdDto solicitationDto);
        ServiceResult<SolicitationIdDto> RefusedSolicitation(SolicitationIdDto solicitationDto);
        ServiceResult<Boolean> OverlapingDates(OverlapingDatesAndTransportsDto overlapingDates);
        ServiceResult<GetByIdSubsidyRpt> GetByIdSubsidyRpt(Guid solicitationId);
        ServiceResult<Guid> SolicitationApprovedBySupervisorId(Guid id);
        ServiceResult<string> WichStateSolicitation(Guid solicitationId);
        ServiceResult<SolicitationIdDto> RefusedAccountForSolicitation(SolicitationIdDto solicitationDto);
        ServiceResult<SolicitationIdDto> AceptedAccountForSolicitation(SolicitationIdDto solicitationDto);
        ServiceResult<FindByIdSolicitationSubsidyWhitStateDto> GetByIdSubsidyWhitState(Guid id);
        ServiceResult<SolicitationIdDto> AceptedMySolicitation(SolicitationIdDto solicitationDto);
        ServiceResult<SolicitationIdDto> AceptedMyAccountForSolicitation(SolicitationIdDto solicitationDto);
        ServiceResult<bool> ValidateBeforeSendAccountFor(Guid solcitationId);
        ServiceResult<bool> ValidateBeforeSendAccountForFinalizeNormally(Guid solicitationId);
        ServiceResult<FindRandomKeySolicitationSubsidyDto> GetByRandomKey(string randomKey);
    }
}
