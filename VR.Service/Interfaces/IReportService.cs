using Service.Common.ServiceResult;
using System;
using System.Threading.Tasks;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IReportService
    {
        ServiceResult<byte[]> ReportPrintAsync(Guid solicitationId);
        ServiceResult<byte[]> PrintAccountFor(Guid solicitationId);
        ServiceResult<byte[]> PrintReportSolicitationSubsidyByUser(Guid userId);
        ServiceResult<byte[]> PrintReportSolicitationSubsidyByOrganism(Guid organismId);
        ServiceResult<byte[]> PrintReport_SolicitationByDestiniesAndDates(ReportByDestiniesAndDatesDto reportByDestiniesAndDates);
    }
}
