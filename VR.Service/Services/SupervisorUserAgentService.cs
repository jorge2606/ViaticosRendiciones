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
                    SupervisorId = x.SupervisorId
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
                .Include(x => x.Agents)
                .Select(x => _Mapper.Map<AllSupervisorAgentDto>(x))
                .ToList();

            return new ServiceResult<List<AllSupervisorAgentDto>>(result);
        }

    }
}
