using Service.Common.ServiceResult;
using System;

namespace VR.Service.Interfaces
{
    public interface IReportService
    {
        ServiceResult<byte[]> ReportPrint(Guid solicitationId, Guid currentUserId);
    }
}
