using Service.Common.ServiceResult;
using System;
using System.Collections.Generic;
using System.Text;
using VR.Dto;

namespace StoresProcedures.IStoresProcedures
{
    public interface ISolicitationProcedure
    {
        ServiceResult<List<AllSolicitationSubsidyDto>> ViewSolicitationAsSupervisorProcedure(Guid SupervisorId, Guid AgentId);
    }
}
