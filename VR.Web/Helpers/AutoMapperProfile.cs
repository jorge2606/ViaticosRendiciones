using System;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Helpers;

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
            CreateMap<AgentSolicitationBySupervisorResult, AllSolicitationSubsidyDto>();
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
            CreateMap<State, StateDescriptionDto>();
            CreateMap<SolicitationState, SolicitationStateDto>();
            CreateMap<Distribution, DistributionBaseDto>();
            CreateMap<Distribution, AllDistributionDto>();
            CreateMap<Distribution, FindByIdDistributionDto>();
            CreateMap<Distribution, DeleteDistributionDto>();
            CreateMap<Organism, OrganismBaseDto>();
            CreateMap<Organism, GetallOrganismDto>();
            CreateMap<Organism, FindByIdOrganismDto>();
            CreateMap<Organism, DeleteOrganismDto>();
            CreateMap<Destiny, DestinyFromSolicitationSubsidyFindByIdDto>()
                .ForMember(x=> x.StartDateToPrint, opt=> opt.MapFrom(m => m.StartDate));
            CreateMap<Notification, NotificationDto>()
                .ForMember(x => x.Days, opt => opt.MapFrom(
                    m => TimeAgoClass.TimeAgo(m.CreationTime)
            ));
        }
    }
}
