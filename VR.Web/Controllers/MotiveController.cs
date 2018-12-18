using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VR.Service.Interfaces;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotiveController : ControllerBase
    {
        private readonly IMotiveService _motiveService;

        public MotiveController(
            IMotiveService motiveService
            )
        {
            _motiveService = motiveService;
        }
        // GET: api/Motive
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var result = _motiveService.GetAllMotive();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }
        
        // POST: api/Motive
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Motive/5
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
