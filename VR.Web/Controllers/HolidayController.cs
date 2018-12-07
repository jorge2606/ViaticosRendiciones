using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayService _holidayService;

        public HolidayController(
            IHolidayService holidayService
            )
        {
            _holidayService = holidayService;
        }
        // GET: api/Holiday
        [HttpGet("GetPageHoliday")]
        [AllowAnonymous]
        public IActionResult GetPageHoliday([FromQuery] FilterHolidayDto filters)
        {
            var response = _holidayService.Pagination(filters);
            if (response.List.Count == 0)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        // GET: api/Holiday/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Holiday
        [HttpPost("create")]
        public IActionResult Post([FromBody] CreateHolidayDto newHoliday)
        {
            var result = _holidayService.CreateHoliday(newHoliday);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        // PUT: api/Holiday/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
