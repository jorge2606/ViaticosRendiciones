using AutoMapper;
using VR.Data.Model;
using VR.Dto;

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
