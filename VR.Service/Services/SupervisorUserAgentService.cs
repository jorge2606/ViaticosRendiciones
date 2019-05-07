using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class SupervisorUserAgentService : ISupervisorUserAgentService
    {
        public DataContext _Context;
        public IMapper _Mapper;

        public SupervisorUserAgentService(
            DataContext context,
            IMapper mapper)
        {
            _Context = context;
            _Mapper = mapper;
        }

        public ServiceResult<Guid> DeleteRelationshipBetweenAgentAndSupervisor(Guid supervisorId, Guid AgentId)
        {
            var agentAndSupervisor = _Context.SupervisorUserAgents.FirstOrDefault(x => x.AgentId == AgentId && x.SupervisorId == supervisorId);

            if (agentAndSupervisor == null)
            {
                return new ServiceResult<Guid>(Guid.Empty);
            }

            _Context.SupervisorUserAgents.Remove(agentAndSupervisor);
            _Context.SaveChanges();

            return new ServiceResult<Guid>(supervisorId);
        }

        public ServiceResult<List<CreateSupervisorAgentDto>> Create(List<CreateSupervisorAgentDto> createSupervisor)
        {
            if (createSupervisor == null)
            {
                return new ServiceResult<List<CreateSupervisorAgentDto>>(null);
            }

            SupervisorUserAgent newAgents;

            createSupervisor.ForEach(x=>
            {
                newAgents = new SupervisorUserAgent()
                {
                    Id = new Guid(),
                    AgentId = x.AgentId,
                    SupervisorId = x.SupervisorId,
                    SupervisorId2 = x.SupervisorId2
                };

                _Context.SupervisorUserAgents.Add(newAgents);
                _Context.SaveChanges();
            });

            return new ServiceResult<List<CreateSupervisorAgentDto>>(createSupervisor);
        }

        public ServiceResult<List<AllSupervisorAgentDto>> AllSupervisorAgent()
        {
            var result = _Context.SupervisorUserAgents
                .Include(x => x.Supervisors)
                .Include(x => x.Supervisors2)
                .Include(x => x.Agents)
                .Select(x => _Mapper.Map<AllSupervisorAgentDto>(x))
                .Where(c => !c.IsDeleted)
                .ToList();

            return new ServiceResult<List<AllSupervisorAgentDto>>(result);
        }


        public ServiceResult<List<SupervisorsDto>> AllSupervisors()
        {
            var rolSupervisor = _Context.Roles.FirstOrDefault(x => x.Name.ToUpper() == Role.Supervisor.ToUpper() );
            var rolMinistro = _Context.Roles.FirstOrDefault(x => x.Name.ToUpper() == Role.Ministro.ToUpper() );
            var rolAdmin = _Context.Roles.FirstOrDefault(x => x.Name.ToUpper() == Role.Admin.ToUpper());

            var usersRoles = _Context.UserRoles.Where(
                x => x.RoleId == rolSupervisor.Id ||
                     x.RoleId == rolAdmin.Id || 
                     x.RoleId == rolMinistro.Id
                ).ToList();

            var result = new List<SupervisorsDto>();
            usersRoles.ForEach(
                ur =>
                {
                    result.Add(new SupervisorsDto()
                    {
                        Supervisors = _Mapper.Map<UserDto>(_Context.Users.FirstOrDefault(user => user.Id == ur.UserId)),
                        RoleName = _Context.Roles.FirstOrDefault(x => x.Id == ur.RoleId).NormalizedName
                    });
                });

            return new ServiceResult<List<SupervisorsDto>>(result);
        }

        public ServiceResult<Boolean> IsAgent(Guid myUserId, Guid otherUserId)
        {
            var isSupervisor = _Context.SupervisorUserAgents
                .FirstOrDefault(x => x.SupervisorId == otherUserId && x.AgentId == myUserId);
            var isAgent = _Context.SupervisorUserAgents.FirstOrDefault(x => x.AgentId == otherUserId && x.SupervisorId == myUserId);

            if (isSupervisor != null)
            {
                return new ServiceResult<Boolean>(false);
            }

            if (isAgent != null)
            {
                return new ServiceResult<Boolean>(true);
            }

            return new ServiceResult<bool>(false);
        }

    }
}
