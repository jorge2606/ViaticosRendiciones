using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupervisorUserAgentController : ControllerBase
    {
        private readonly ISupervisorUserAgentService _service;

        public SupervisorUserAgentController(
            ISupervisorUserAgentService service
            )
        {
            _service = service;
        }
        [HttpPost("Create")]
        public IActionResult Create([FromBody] List<CreateSupervisorAgentDto> createSupervisorAgent)
        {
            var result = _service.Create(createSupervisorAgent);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("AllSupervisorAgents")]
        public IActionResult AllSupervisorAgents()
        {
            var result = _service.AllSupervisorAgent();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }
    }
}
