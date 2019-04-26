using Service.Common.ServiceResult;
using System;
using System.Threading.Tasks;

namespace VR.Service.Interfaces
{
    public interface IReportService
    {
        ServiceResult<byte[]> ReportPrintAsync(Guid solicitationId);
        ServiceResult<byte[]> PrintAccountFor(Guid solicitationId);
    }
}
