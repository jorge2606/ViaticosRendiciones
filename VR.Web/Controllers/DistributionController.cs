using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public DistributionController(IDistributionService distributionService,
            DataContext dataContext)
        {
            _distributionService = distributionService;
            _dataContext = dataContext;
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


        public IQueryable<Distribution> queryableUser()
        {
            var Paginator = _dataContext.Distributions.OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page/{page}")]
        public PagedResult<Distribution> userPagination(int? page)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<Distribution>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}