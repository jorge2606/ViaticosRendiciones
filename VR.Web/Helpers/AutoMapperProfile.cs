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

            CreateMap<SolicitationSubsidy, AllSolicitationSubsidyDto>().ForMember(x => x.TransportDescription,
                opt => opt.MapFrom(x => $"Modelo: {x.Transport.Model} Patente :{x.Transport.CarPlate}"));
        }
    }
}
