﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VR.Common.Security;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;
using VR.Web.Helpers;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportController : ControllerBase
    {
        private readonly ITransportService _transportService;
        private readonly DataContext _dataContext;

        public TransportController(ITransportService transportService, DataContext dataContext)
        {
            _transportService = transportService;
            _dataContext = dataContext;
        }

        [HttpPost("Create")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanCreateTransport, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CreateTransport(CreateTransportDto createTransport)
        {
            var result = _transportService.CreateTransport(createTransport);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var response = _transportService.GetAllTransport();
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }

            return Ok(response.Response);
        }

        [HttpPut("Update")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanEditTransport, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult UpdateTransport(UpdateTransportDto updateTransport)
        {
            var result = _transportService.UpdateTransport(updateTransport);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("FindByIdTransport/{findByIdTransport}")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanEditTransport, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult FindByIdTransport(Guid findByIdTransport)
        {
            var result = _transportService.FindByIdTransport(findByIdTransport);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpDelete("Delete/{id}")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanDeleteTransport, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Delete(Guid id)
        {
            var result = _transportService.DeleteTransport(id);

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

        [HttpPost("CarIsBeingUsedByOtherSolicitation")]
        [Authorize]
        public IActionResult CarIsBeingUsedByOtherSolicitation([FromBody] CarIsBeingUsedByOtherSolicitation transport)
        {
            transport.UserId = GetIdUser();
            var result = _transportService.CarIsBeingUsedByOtherSolicitation(transport);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("CarIsBeingUsedByOtherSolicitationById/{solicitationId}")]
        [Authorize]
        public IActionResult CarIsBeingUsedByOtherSolicitationById(Guid solicitationId)
        {
            var result = _transportService.CarIsBeingUsedByOtherSolicitationById(solicitationId);

            return Ok(result);
        }


        public IQueryable<Transport> queryableUser()
        {
            var Paginator = _dataContext.Transports
                .Where(x => x.IsDeleted != true)
                .OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page/{page}")]
        [Authorize(Policy = SolicitationSubsidyClaims.CanViewTransport, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public PagedResult<Transport> userPagination(int? page)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator
                .Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();

            if (result.Count() == 0 && page > 0)
            {
               result = queryPaginator
                    .Skip( ( (page ?? 0) -1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            return new PagedResult<Transport>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }

    }
}