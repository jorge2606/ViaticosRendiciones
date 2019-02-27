using System;
using System.Threading.Tasks;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IFileService
    {
        Task<ServiceResult<UpdateMyImageDto>> UpdateMyImage(UpdateMyImageDto model);
        Task<ServiceResult<UpdateMyImageDto>> HolographSignUpdate(UpdateMyImageDto model);
        ServiceResult<FileByIdDto> GetByIdFile(Guid userId);
        ServiceResult<FileByIdDto> GetCompletePath(Guid userId);
        ServiceResult<FileByIdDto> RemoveProfilePhoto(Guid userId);
        ServiceResult<FileByIdDto> GetCompletePathHolographSign(Guid userId);
        ServiceResult<FileByIdDto> RemoveHolographSign(Guid userId);
        ServiceResult<FileCreateFromRefundDto> AddExpenditureRefundImage(FileCreateFromRefundDto image);
        ServiceResult<byte[]> GetUrlExpenditureRefundFile(Guid expenditureId);
    }
}
