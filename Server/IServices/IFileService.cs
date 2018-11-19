using System;
using server.Dto;
using System.Threading.Tasks;
using server.ServiceResult;

namespace server.IServices
{
    public interface IFileService
    {
        Task<ServiceResult<UpdateMyImageDto>> UpdateMyImage(UpdateMyImageDto model);
        ServiceResult<FileByIdDto> GetByIdFile(Guid userId);
        ServiceResult<FileByIdDto> GetCompletePath(Guid userId);
        ServiceResult<FileByIdDto> RemoveProfilePhoto(Guid userId);
    }
}
