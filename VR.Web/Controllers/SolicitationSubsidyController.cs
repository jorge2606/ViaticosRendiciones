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
            var result = _solicitationSubsidyService.GetByIdSubsidyDto(id);
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


        public IQueryable<AllSolicitationSubsidyDto> queryableUser()
        {
            var Paginator = _dataContext.SolicitationSubsidies
                .Select(x => _mapper.Map<AllSolicitationSubsidyDto>(x))
                .OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page")]
        public PagedResult<AllSolicitationSubsidyDto> UserPagination([FromQuery] FilterSolicitationSubsidyDto filters)
        {
            const int pageSize = 10;
            //var SolicitationStates = _dataContext.SolicitationStates
            //    .OrderBy(x => x.ChangeDate).FirstOrDefault(y => y.SolicitationSubsidyId).ToList();

              var resultFull = _dataContext.SolicitationSubsidies
              .Include(x => x.SolicitationStates).ThenInclude(x => x.State)
              .Include(x => x.Destinies).ThenInclude(x => x.City)
              .Include(x => x.Destinies).ThenInclude(x => x.Country)
              .Include(x => x.Destinies).ThenInclude(x => x.Province)
              .Include(x => x.User)
              //.Join(SolicitationStates,
              //solicitationSubsidy => solicitationSubsidy.Id,
              //solicitationStates => solicitationStates.SolicitationSubsidyId,
              //(solicitationSubsidy, solicitationStates) => new
              //{
              //    solicitationSubsidy.User,
              //    solicitationSubsidy.Destinies,
              //    solicitationSubsidy.Expenditures,
              //    solicitationSubsidy.Id,
              //    solicitationSubsidy.Motive,
              //    solicitationSubsidy.Total,
              //    solicitationSubsidy.UserId,
              //    State = solicitationStates.State.Description,
              //    solicitationSubsidy.CreateDate,
              //})
              .Select(x => _mapper.Map<AllSolicitationSubsidyDto>(x));
            

            var resultPage = resultFull.Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<AllSolicitationSubsidyDto>
            {
                List = resultPage,
                TotalRecords = resultFull.Count()
            };
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