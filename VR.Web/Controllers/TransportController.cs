using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
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
        [AllowAnonymous]
        public IActionResult Delete(Guid id)
        {
            var result = _transportService.DeleteTransport(id);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);

        }

        public IQueryable<Transport> queryableUser()
        {
            var Paginator = _dataContext.Transports.OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page/{page}")]
        public PagedResult<Transport> userPagination(int? page)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<Transport>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }

    }
}