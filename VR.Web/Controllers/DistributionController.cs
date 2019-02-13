using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;
using VR.Web.Helpers;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DistributionController : ControllerBase
    {
        private readonly IDistributionService _distributionService;
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public DistributionController(IDistributionService distributionService,
            DataContext dataContext, IMapper mapper)
        {
            _distributionService = distributionService;
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [HttpPost("CreateDistribution")]
        public IActionResult CreateDistribution(CreateDistributionDto createDistribution)
        {
            var result = _distributionService.CreateDistribution(createDistribution);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPut("UpdateDistribution")]
        public IActionResult UpdateDistribution(UpdateDistributionDto updateDistribution)
        {
            var result = _distributionService.UpdateDistribution(updateDistribution);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }


        [HttpGet("FindByIdDistribution/{findByIdDistribution}")]
        public IActionResult FindByIdCategory(Guid findByIdDistribution)
        {
            var response = _distributionService.FindByIdDistribution(findByIdDistribution);

            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }

            return Ok(response.Response);
        }

        [HttpDelete("DeleteDistribution/{distributionId}")]
        public IActionResult DeleteDistribution(Guid distributionId)
        {
            var result = _distributionService.DeleteDistribution(distributionId);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("AllDistributions")]
        public IActionResult AllDistribution()
        {
            var result = _distributionService.AllDistribution();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);

        }


        public IQueryable<AllDistributionDto> queryableUser()
        {
            var Paginator = _dataContext.Distributions
                .Include(x => x.Users)
                .Include(q => q.Organism)
                .Select(dist => _mapper.Map<AllDistributionDto>(dist))
                .Where(y => y.IsDeleted != true);
            return Paginator;
        }

        [HttpGet("page")]
        public PagedResult<AllDistributionDto> userPagination([FromQuery] FilterDistributionDto filters)
        {       
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator
                .Where( 
                   x => (string.IsNullOrEmpty(filters.Name) || x.Name.ToUpper().Contains(filters.Name.ToUpper()))
                         &&
                        (!filters.OrganismId.HasValue || x.OrganismId == filters.OrganismId)
                ).Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<AllDistributionDto>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}