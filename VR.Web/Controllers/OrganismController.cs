using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class OrganismController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IOrganismService _organismService;
     
        public OrganismController(DataContext context, IOrganismService organismService)
        {
            _context = context;
            _organismService = organismService;
        }

        [HttpPut("Update")]
        public IActionResult UpdateOrganism(UpdateOrganismDto updateOrganism)
        {
            var result = _organismService.UpdateOrganism(updateOrganism);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("FindById/{id}")]
        public IActionResult FindByIdOrganism(Guid id)
        {
            var result = _organismService.FindByIdOrganism(id);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("Create")]
        public IActionResult CreateOrganism(CreateOrganismDto createOrganism)
        {
            var result = _organismService.CreateOrganism(createOrganism);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteOrganism(Guid id)
        {
            var result = _organismService.DeleteOrganism(id);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        public IQueryable<Organism> queryableUser()
        {
            var usersPaginator = _context.Organisms.OrderBy(x => x.Name);
            return usersPaginator;
        }

        [HttpGet("page/{page}")]
        public PagedResult<Organism> userPagination(int? page)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<Organism>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}