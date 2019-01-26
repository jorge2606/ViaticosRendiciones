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
        public IActionResult GetPageHoliday([FromQuery] FilterHolidayDto filters)
        {
            var response = _holidayService.Pagination(filters);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }

            return Ok(response.Response);
        }

        // GET: api/Holiday/5
        [HttpGet("getById/{id}")]
        public IActionResult GetById(Guid id)
        {
            var result = _holidayService.FindByIdHoliday(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
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
        [HttpPut("update")]
        public IActionResult Update([FromBody] UpdateHolidayDto holiday)
        {
            var result = _holidayService.UpdateHoliday(holiday);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            var response = _holidayService.DeleteHoliday(id);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }

            return Ok(response.Response);
        }
    }
}
