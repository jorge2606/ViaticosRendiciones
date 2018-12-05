using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VR.Data;
using VR.Dto;
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
        [AllowAnonymous]
        public IActionResult Create(CreateSolicitationSubsidyDto solicitationSubsidy)
        {
            var result = _solicitationSubsidyService.Create(solicitationSubsidy);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }



        public IQueryable<AllSolicitationSubsidyDto> queryableUser()
        {
            var Paginator = _dataContext.SolicitationSubsidies
                .Select( x => _mapper.Map<AllSolicitationSubsidyDto>(x))
                .OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page")]
       
        public PagedResult<AllSolicitationSubsidyDto> UserPagination([FromQuery] FilterSolicitationSubsidyDto filters)
        {
            const int pageSize = 10;

            var resultFull = _dataContext.SolicitationSubsidies
               .Where(
                x => (string.IsNullOrEmpty(filters.UserName) || x.User.UserName.ToUpper().Contains(filters.UserName.ToUpper()))
                     &&
                     (!filters.DestinyId.HasValue || x.DestinyId == filters.DestinyId)
                     &&
                     (!filters.MotiveId.HasValue || x.MotiveId == filters.MotiveId)
                     &&
                     (!filters.PlaceId.HasValue || x.PlaceId == filters.PlaceId)
                     &&
                     (!filters.TransportId.HasValue || x.TransportId == filters.TransportId)
            );

            var resultPage = resultFull.Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ProjectTo<AllSolicitationSubsidyDto>()
                .ToList();

            return new PagedResult<AllSolicitationSubsidyDto>
            {
                List = resultPage,
                TotalRecords = resultFull.Count()
            };
        }
    }
}