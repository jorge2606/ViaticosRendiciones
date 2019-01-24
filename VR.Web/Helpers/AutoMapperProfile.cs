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
                .ForMember(
                    x => x.State,
                    opt => opt.MapFrom(x => x.SolicitationStates.OrderByDescending(y => y.ChangeDate)
                        .FirstOrDefault().State.Description)
                )
                .ForMember(
                    x => x.MotiveReject,
                    opt => opt.MapFrom(x => x.SolicitationStates.OrderByDescending(y => y.ChangeDate)
                        .FirstOrDefault().MotiveReject)
                ).ForMember(x => x.FileNumber,
                    opt => opt.MapFrom(j => j.SolicitationStates.OrderByDescending(y => y.ChangeDate)
                        .FirstOrDefault().FileNumber)
                );
            CreateMap<Expenditure, ExpenditureFromSolicitationSubsidyByIdDto>();
            CreateMap<User, UserDto>();
            CreateMap<SupplementaryCity, SupplementaryCityDto>();

            CreateMap<SupplementaryCity, SupplementaryCityOnlyId>()
                .ForMember(x => x.Name,
                    opt => opt.MapFrom(q => q.City.Name)
                    );

            CreateMap<Destiny, DestinyFromSolicitationSubsidyByIdDto>()
                .ForMember(
                    x => x.SupplementaryCities,
                    opt => opt.MapFrom(y => y.SupplementaryCities));

            CreateMap<SupervisorUserAgent, AllSupervisorAgentDto>();
            CreateMap<User, AllUserDto>();
            CreateMap<State, StateDto>();
            CreateMap<Distribution, AllDistributionDto>();
        }
    }
}
