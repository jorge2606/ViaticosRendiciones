using System.Linq;
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
            CreateMap<SolicitationSubsidy, AllSolicitationSubsidyDto>()
                .ForMember(x => x.State, opt => opt.MapFrom(x => 
                    x.SolicitationStates.OrderByDescending(y => y.ChangeDate)
                    .FirstOrDefault().State.Description));
            //CreateMap<SolicitationState, AllSolicitationSubsidyDto>()
            //    .ForMember(x => x.State, opt => opt.MapFrom(x => x.State.Description));
            CreateMap<Expenditure, ExpenditureFromSolicitationSubsidyByIdDto>();
            CreateMap<User, UserDto>();
            CreateMap<Destiny, DestinyFromSolicitationSubsidyByIdDto>();
            CreateMap<SolicitationSubsidy, FindByIdSolicitationSubsidyDto>();
            CreateMap<SupervisorUserAgent, AllSupervisorAgentDto>();
            CreateMap<User, AllUserDto>();
            CreateMap<State, StateDto>();
            CreateMap<Distribution, AllDistributionDto>();
        }
    }
}
