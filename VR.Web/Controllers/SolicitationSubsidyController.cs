using System;
using System.Collections.Generic;
using System.Data.Common;
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
using VR.Common.Security;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;
using VR.Web.Helpers;
using VR.Common.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
        [Authorize(Policy = SolicitationSubsidyClaims.CanCreateSolicitation, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

        [HttpPost("CreateCommission")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanCreateCommissionSolicitation, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CreateCommission([FromBody] CreateSolicitationSubsidyDto solicitationSubsidy)
        {
            var currentUser = Helpers.HttpContext.Current.User.Claims;
            foreach (var i in currentUser)
            {
                if (i.Type.Equals("NameIdentifier"))
                {
                    solicitationSubsidy.UserId = Guid.Parse(i.Value);
                }
            }

            var result = _solicitationSubsidyService.CreateComission(solicitationSubsidy);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("CreateAccountFor")]
        [Authorize]
        public IActionResult CreateAccountFor([FromBody] CreateSolicitationSubsidyDto accountForSolicitation)
        {
            var result = _solicitationSubsidyService.CreateAccountFor(accountForSolicitation);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("getBySolicitationId/{id}")]
        [Authorize]
        public IActionResult GetBySolicitationId(Guid id)
        {
            var result = _solicitationSubsidyService.GetByIdSubsidy(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("getBySolicitationIdForEmail/{id}")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanModerateRefund, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Policy = SolicitationSubsidyClaims.CanModerateSolicitation, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetBySolicitationIdForEmail(Guid id)
        {
            var result = _solicitationSubsidyService.GetByIdSubsidy(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("GetByRandomKey/{key}")]
        [Authorize]
        public IActionResult GetByRandomKey(string key)
        {
            var result = _solicitationSubsidyService.GetByRandomKey(key);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("GetBySolicitationIdWhitState/{id}")]
        [Authorize]
        public IActionResult GetBySolicitationIdWhitState(Guid id)
        {
            var result = _solicitationSubsidyService.GetByIdSubsidyWhitState(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("validateBeforeSendAccountFor/{id}")]
        [Authorize]
        public IActionResult validateBeforeSendAccountFor(Guid id)
        {
            var result = _solicitationSubsidyService.ValidateBeforeSendAccountFor(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet("validateBeforeSendAccountForFinalizeNormally/{id}")]
        [Authorize]
        public IActionResult validateBeforeSendAccountForFinalizeNormally(Guid id)
        {
            var result = _solicitationSubsidyService.ValidateBeforeSendAccountForFinalizeNormally(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("sendSolicitation")]
        [Authorize]
        public async Task<IActionResult> SendSolicitation([FromBody] SolicitationIdDto solicitation)
        {
            var result = await _solicitationSubsidyService.SendSolicitationAsync(solicitation);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok();
        }

        [HttpPost("sendAccountForToSupervisor")]
        [Authorize]
        public async Task<IActionResult> SendAccountForToSupervisor([FromBody] SolicitationIdDto solicitation)
        {
            var result = await _solicitationSubsidyService.SendAccuountForSolicitationToSupervisorAsync(solicitation);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok();
        }

        [HttpGet("SomeSolicitationHasThisExpenditure/{key}/{expenditureId}")]
        [Authorize]
        public IActionResult SomeSolicitationHasThisExpenditure(string key, Guid expenditureId)
        {
            var result = _solicitationSubsidyService.SomeSolicitationHasThisExpenditure(key, expenditureId);
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

        [HttpGet("pageAgent")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanViewSolicitation,AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public PagedResult<AllSolicitationSubsidyDto> AgentPagination([FromQuery] FilterSolicitationSubsidyDto filters)
        {
            var agentId = GetIdUser();
            const int pageSize = 10;
            var resultFull = new List<AllSolicitationSubsidyDto>();
            var result = new object();
            int totalRows = 0;
            var pageIndex = filters.Page == 0 ? 1 : filters.Page;

            var results = _dataContext.GetSolicitationsByAgent(agentId, filters.FirstName,
                filters.LastName, filters.Dni, "FIRSTNAME ASC", pageSize, pageIndex);
            foreach (var s in results.List)
            {
                if (!s.IsRefund && s.FinalizeDate == null && s.State == "Aceptado")
                {
                    if (DateTime.Today.CompareTo(s.EndDate.Value) >= 0)
                    {
                        var solicitation = _dataContext.SolicitationSubsidies.FirstOrDefault(sol => sol.Id == s.Id);
                        SolicitationState solicitationState = new SolicitationState()
                        {
                            Id = new Guid(),
                            SolicitationSubsidy = solicitation,
                            ChangeDate = DateTime.Now,
                            StateId = State.Finished
                        };
                        _dataContext.SolicitationStates.Add(solicitationState);
                        solicitation.FinalizeDate = s.EndDate;
                        s.FinalizeDate = s.EndDate;
                        _dataContext.SolicitationSubsidies.Update(solicitation);
                        _dataContext.SaveChanges();
                    }
                }
            }

            return new PagedResult<AllSolicitationSubsidyDto>
            {
                List = results.List.Select(_mapper.Map<AllSolicitationSubsidyDto>).OrderByDescending(x => x.CreateDate).ToList(),
                TotalRecords = results.TotalRecords
            };
        }

        [HttpGet("WichStateSolicitation/{solicitationId}")]
        [Authorize]
        public IActionResult WichStateSolicitation(Guid solicitationId)
        {
            var result = _solicitationSubsidyService.WichStateSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(new StateDto(){Description = result.Response});
        }

        [HttpGet("pageSupervisor")]
        [Authorize]
        public PagedResult<AllSolicitationSubsidyDto> SupervisorPaginationAsync(
            [FromQuery] FilterSolicitationSubsidyDto filters)
        {
            const int pageSize = 10;
            var resultFull = new List<AllSolicitationSubsidyDto>();
            var result = new object();
            int totalRows = 0;
            var supervisorId = GetIdUser();
            var pageIndex = filters.Page == 0 ? 1 : filters.Page;

            var results = _dataContext.GetAgentsSolicitationBySupervisor(supervisorId, filters.FirstName,
                filters.LastName, filters.Dni, "FIRSTNAME ASC", pageSize, pageIndex,filters.IsRefund);

            return new PagedResult<AllSolicitationSubsidyDto>()
            {
                List = results.List.Select(_mapper.Map<AllSolicitationSubsidyDto>).ToList(),
                TotalRecords = results.TotalRecords
            };

        }

        [HttpGet("getAmountHolidaysAndWeekends/{solicitationId}")]
        [Authorize]
        public IActionResult GetAmountHolidaysAndWeekends(Guid solicitationId)
        {
            var result = _dataContext.getAmountHolidaysAndWeekends(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
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
        [Authorize(SolicitationSubsidyClaims.CanDeleteSolicitation, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Delete(Guid id)
        {
            var result = _solicitationSubsidyService.Delete(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpDelete("FinalizeSubsidy/{id}")]
        [Authorize]
        public IActionResult FinalizeSubsidy(Guid id)
        {
            var result = _solicitationSubsidyService.FinalizeSubsidy(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPut("Update")]
        [Authorize(SolicitationSubsidyClaims.CanEditSolicitation, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Update([FromBody] UpdateSolicitationSubsidyDto solicitation)
        {
            var sessioUser = GetIdUser();
            var result = _solicitationSubsidyService.Update(solicitation, sessioUser);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("AceptedSolicitation")]
        [Authorize]
        public IActionResult AceptedSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            solicitationId.SupervisorId = GetIdUser();
            var result = _solicitationSubsidyService.AceptedSolicitationAsync(solicitationId);
            if (!result.Result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Result.Response);
        }

        [HttpPost("AceptedMySolicitation")]
        [Authorize]
        public IActionResult AceptedMySolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            solicitationId.SupervisorId = GetIdUser();
            var result = _solicitationSubsidyService.AceptedMySolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("AceptedAccountForSolicitation")]
        [Authorize]
        public IActionResult AceptedAccountForSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            solicitationId.SupervisorId = GetIdUser();
            var result = _solicitationSubsidyService.AceptedAccountForSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("AceptedMyAccountForSolicitation")]
        [Authorize]
        public IActionResult AceptedMyAccountForSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            solicitationId.SupervisorId = GetIdUser();
            var result = _solicitationSubsidyService.AceptedMyAccountForSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }


        [HttpPost("RefusedSolicitation")]
        [Authorize]
        public IActionResult RefusedSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            solicitationId.SupervisorId = GetIdUser();
            var result = _solicitationSubsidyService.RefusedSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("RefusedAccountForSolicitation")]
        [Authorize]
        public IActionResult RefusedAccountForSolicitation([FromBody] SolicitationIdDto solicitationId)
        {
            solicitationId.SupervisorId = GetIdUser();
            var result = _solicitationSubsidyService.RefusedAccountForSolicitation(solicitationId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("GetByIdSubsidyRpt/{id}")]
        [Authorize]
        public IActionResult GetByIdSubsidyRpt(Guid id)
        {
            var result = _solicitationSubsidyService.GetByIdSubsidyRpt(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("SolicitationApprovedBySupervisorId/{id}")]
        [Authorize]
        public IActionResult SolicitationApprovedBySupervisorId(Guid id)
        {
            var result = _solicitationSubsidyService.SolicitationApprovedBySupervisorId(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }
    }
}
