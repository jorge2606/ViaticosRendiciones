using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using server.Dto;
using server.ServiceResult;

namespace server.IServices
{

    public interface IUserService
    {
        Task<ServiceResult<UserDto>> Authenticate(LoginDto p_LoginDto);
        Task UpdateMyProfile(UpdateMyProfile user);
        Task UpdateProfileAsAdmin(UpdateProfileAsAdmin user);
        Task<ServiceResult<string>> CreateAsync(CreateUserDto user);
        void Delete(Guid id);
        Task<ServiceResult<UserDto>> Register(SaveUserDto model);
        Task UpdateUserRole(Guid idUser, Guid id);
        Task<ServiceResult<string>> ForgotPassword(ForgotPasswordDto model);
        Task<ServiceResult<string>> ResetPassword(ResetPassword model);
    }
    
}
