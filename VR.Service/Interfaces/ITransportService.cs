using System;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface ITransportService
    {
        ServiceResult<CreateTransportDto> CreateTransport(CreateTransportDto transportDto);
        ServiceResult<UpdateTransportDto> UpdateTransport(UpdateTransportDto transportDto);
        ServiceResult<DeleteTransportDto> DeleteTransport(Guid idTransport);
        ServiceResult<FindByIdTransportDto> FindByIdTransport(Guid idTransport);
    }
}
