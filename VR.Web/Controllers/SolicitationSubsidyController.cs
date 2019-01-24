using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;
using VR.Web.Helpers;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitationSubsidyController : ControllerBase
    {
        private readonly ISolicitationSubsidyService _solicitationSubsidyService;
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public SolicitationSubsidyController(
            ISolicitationSubsidyService solicitationSubsidyService,
            DataContext dataContext,
            IMapper mapper)
        {
            _solicitationSubsidyService = solicitationSubsidyService;
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        [Authorize]
        public IActionResult Create([FromBody] CreateSolicitationSubsidyDto solicitationSubsidy)
        {
            var currentUser = Helpers.HttpContext.Current.User.Claims;
            foreach (var i in currentUser)
            {
                if (i.Type.Equals("NameIdentifier"))
                {
                    solicitationSubsidy.UserId = Guid.Parse(i.Value);
                }
            }

            var result = _solicitationSubsidyService.Create(solicitationSubsidy);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("getBySolicitationId/{id}")]
        public IActionResult GetBySolicitationId(Guid id)
        {
            var result = _solicitationSubsidyService.GetByIdSubsidy(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("sendSolicitation")]
        public async Task<IActionResult> SendSolicitation([FromBody] SolicitationIdDto solicitation)
        {
            var result = await _solicitationSubsidyService.SendSolicitationAsync(solicitation);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("overlaping")]
        [Authorize]
        public IActionResult OverlapingDate([FromBody] OverlapingDatesAndTransportsDto overlaping)
        {
            var result = _solicitationSubsidyService.OverlapingDates(overlaping);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }


        public IQueryable<AllSolicitationSubsidyDto> queryableUser()
        {
            var Paginator = _dataContext.SolicitationSubsidies
                .Select(x => _mapper.Map<AllSolicitationSubsidyDto>(x))
                .OrderBy(x => x.Id);
            return Paginator;
        }


        [HttpGet("pageAgent")]
        [Authorize]
        public PagedResult<AllSolicitationSubsidyDto> AgentPagination([FromQuery] FilterSolicitationSubsidyDto filters)
        {
            const int pageSize = 10;

             var agentId = GetIdUser();

            var resultFull = _dataContext.SolicitationSubsidies
                .Include(x => x.SolicitationStates).ThenInclude(x => x.State)
                .Include(x => x.Destinies).ThenInclude(x => x.City)
                .Include(x => x.Destinies).ThenInclude(x => x.Country)
                .Include(x => x.Destinies).ThenInclude(x => x.Province)
                .Include(x => x.Destinies).ThenInclude(q => q.SupplementaryCities).ThenInclude(c => c.City)
                .Include(x => x.User)
                .Select(x => _mapper.Map<AllSolicitationSubsidyDto>(x))
                .Where(x => x.UserId == agentId);

                    var resultPage = resultFull.ToList();
                    var condition = string.IsNullOrEmpty(filters.FirstName) &&
                                    string.IsNullOrEmpty(filters.LastName) &&
                                    string.IsNullOrEmpty(filters.Dni);
                    if (resultFull.ToList().Count() > 0 && !condition)
                    {
                        resultPage = resultFull
                        .Where(
                            x => (string.IsNullOrEmpty(filters.FirstName) ||
                                 x.User.FirstName.ToUpper().Contains(filters.FirstName.ToUpper()))
                                &&
                                (string.IsNullOrEmpty(filters.LastName) ||
                                 x.User.LastName.ToUpper().Contains(filters.LastName.ToUpper()))
                                &&
                                 (string.IsNullOrEmpty(filters.Dni) || x.User.Dni.ToString().ToUpper().Contains(filters.Dni.ToString().ToUpper()))

                        ).Skip((filters.Page ?? 0) * pageSize)
                        .Take(pageSize)
                        .ToList();
                    }
            return new PagedResult<AllSolicitationSubsidyDto>
            {
                List = resultPage,
                TotalRecords = resultFull.Count()
            };
        }

        [HttpGet("pageSupervisor")]
        [Authorize]
        public PagedResult<AllSolicitationSubsidyDto> SupervisorPagination(
            [FromQuery] FilterSolicitationSubsidyDto filters)
        {
            const int pageSize = 10;

            var supervisorId = GetIdUser();

            var AgentBelongToSupervisor = _dataContext.SupervisorUserAgents
                .Where(x => x.SupervisorId == supervisorId).ToList();

            var resultFull = _dataContext.SolicitationSubsidies
                .Include(x => x.SolicitationStates).ThenInclude(x => x.State)
                .Include(x => x.Destinies).ThenInclude(x => x.City)
                .Include(x => x.Destinies).ThenInclude(x => x.Country)
                .Include(x => x.Destinies).ThenInclude(x => x.Province)
                .Include(x => x.Destinies).ThenInclude(q => q.SupplementaryCities).ThenInclude(c => c.City)
                .Include(x => x.User)
                .Select(x => _mapper.Map<AllSolicitationSubsidyDto>(x))
                .Join(AgentBelongToSupervisor,
                    solicitation => solicitation.UserId,
                    agentAndSupervisor => agentAndSupervisor.AgentId,
                    (sol, agent) => new AllSolicitationSubsidyDto()
                    {
                        Id = sol.Id,
                        Motive = sol.Motive,
                        Total = sol.Total,
                        Expenditures = sol.Expenditures,
                        Destinies = sol.Destinies,
                        UserId = sol.UserId,
                        User = sol.User,
                        CreateDate = sol.CreateDate,
                        State = sol.State,
                        MotiveReject = sol.MotiveReject,
                        FileNumber = sol.FileNumber
                    });

            var resultPage = resultFull.ToList();
            var condition = string.IsNullOrEmpty(filters.FirstName) &&
                            string.IsNullOrEmpty(filters.LastName) &&
                            string.IsNullOrEmpty(filters.Dni);
            if (resultFull.ToList().Count() > 0 && !condition) { 
                    resultPage = resultFull
                    .Where(
                        x => (string.IsNullOrEmpty(filters.FirstName) ||
                             x.User.FirstName.ToUpper().Contains(filters.FirstName.ToUpper() ) )
                            &&  
                            (string.IsNullOrEmpty(filters.LastName) ||
                             x.User.LastName.ToUpper().Contains(filters.LastName.ToUpper()) )
                            &&
                             (string.IsNullOrEmpty(filters.Dni) || x.User.Dni.ToString().ToUpper().Contains(filters.Dni.ToString().ToUpper()))
                             
                    ).Skip((filters.Page ?? 0) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

        return new PagedResult<AllSolicitationSubsidyDto>
            {
                List = resultPage,
                TotalRecords = resultFull.Count()
            };
        }

        public Guid GetIdUser()
        {
            var currentUser = Helpers.HttpContext.Current.User.Claims;
            var result = Guid.Empty; 
            foreach (var i in currentUser)
            {
                if (i.Type.Equals("NameIdentifier"))
                {
                   result = Guid.Parse(i.Value);
                }
            }

            return result;
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            var result = _solicitationSubsidyService.Delete(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPut("Update")]
        public IActionResult Update([FromBody] UpdateSolicitationSubsidyDto solicitation)
        {
            var result = _solicitationSubsidyService.Update(solicitation);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("AceptedSolicitation")]
        public IActionResult AceptedOrRefusedSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            var result = _solicitationSubsidyService.AceptedSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("RefusedSolicitation")]
        public IActionResult RefusedSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            var result = _solicitationSubsidyService.RefusedSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }
    }
}