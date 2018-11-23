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
    public class ExpenditureController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IExpenditureService _expenditureService;

        public ExpenditureController(DataContext context, IExpenditureService expenditureService)
        {
            _context = context;
            _expenditureService = expenditureService;
        }

        public IQueryable<Expenditure> queryableUser()
        {
            var usersPaginator = _context.Expenditures.OrderBy(x => x.Name);
            return usersPaginator;
        }

        [HttpPut("Update")]
        public IActionResult UpdateExpenditure(UpdateExpenditureDto expenditure)
        {
            var result = _expenditureService.UpdateExpenditure(expenditure);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteExpenditure(Guid id)
        {
            var result = _expenditureService.DeleteExpenditure(id);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("FindById/{id}")]
        public IActionResult FindById(Guid id)
        {
            var result = _expenditureService.FindByIdExpenditure(id);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpPost("Create")]
        public IActionResult CreateExpenditure(CreateExpenditureDto createExpenditure)
        {
            var result = _expenditureService.CreateDistribution(createExpenditure);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("page/{page}")]
        public PagedResult<Expenditure> userPagination(int? page)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<Expenditure>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}