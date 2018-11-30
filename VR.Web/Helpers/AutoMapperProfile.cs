using AutoMapper;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, SaveUserDto>();
            CreateMap<SaveUserDto, User>();
        }
    }
}
