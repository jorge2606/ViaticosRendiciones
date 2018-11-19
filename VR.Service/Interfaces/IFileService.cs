using System;
using System.Threading.Tasks;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IFileService
    {
        Task<ServiceResult<UpdateMyImageDto>> UpdateMyImage(Dto.UpdateMyImageDto model);
        ServiceResult<FileByIdDto> GetByIdFile(Guid userId);
        ServiceResult<FileByIdDto> GetCompletePath(Guid userId);
        ServiceResult<FileByIdDto> RemoveProfilePhoto(Guid userId);
    }
}
