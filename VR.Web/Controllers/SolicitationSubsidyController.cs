using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            var Paginator = _dataContext.SolicitationSubsidies.Select(x => _mapper.Map<AllSolicitationSubsidyDto>(x)).OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page")]
       
        public PagedResult<AllSolicitationSubsidyDto> userPagination([FromQuery] FilterSolicitationSubsidyDto filters)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.
                Where(
                    x => (!filters.UserId.HasValue || x.UserId == filters.UserId)
                         &&
                         (!filters.DestinityId.HasValue || x.DestinityId == filters.DestinityId)
                         &&
                         (!filters.MotiveId.HasValue || x.MotiveId == filters.MotiveId)
                         &&
                         (!filters.PlaceId.HasValue || x.PlaceId == filters.PlaceId)
                         &&
                         (!filters.TransportId.HasValue || x.TransportId == filters.TransportId)
                ).Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();

            foreach (var i in result)
            {
                i.User = _dataContext.Users.FirstOrDefault(x => x.Id == i.UserId);
                i.Place = _dataContext.Places.FirstOrDefault(x => x.Id == i.PlaceId);
                i.Transport = _dataContext.Transports.FirstOrDefault(x => x.Id == i.TransportId);
                i.Motive = _dataContext.Motives.FirstOrDefault(x => x.Id == i.MotiveId);
                i.Destinity = _dataContext.Destinities.FirstOrDefault(x => x.Id == i.DestinityId);
            }
            return new PagedResult<AllSolicitationSubsidyDto>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}