﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;
     
        public OrganismController(DataContext context, 
                                  IOrganismService organismService,
                                  IMapper mapper)
        {
            _context = context;
            _organismService = organismService;
            _mapper = mapper;  
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

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var result = _organismService.GetAllOrganism();
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

        public IQueryable<GetallOrganismDto> queryableUser()
        {
            var usersPaginator = _context.Organisms
                .Where(x => x.IsDeleted != true)
                .Select(x => _mapper.Map<GetallOrganismDto>(x) ).OrderBy(x => x.Name);
            return usersPaginator;
        }

        [HttpGet("page")]
        public PagedResult<GetallOrganismDto> userPagination([FromQuery] FilterOrganismDto filters)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Where(
                   x => 
                       ( string.IsNullOrEmpty(filters.Name) || x.Name.ToUpper().Contains(filters.Name.ToUpper()) ) 
                    ).Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<GetallOrganismDto>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}