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
    public class SolicitationStateController : ControllerBase
    {
        private readonly ISolicitationStateService _solicitationStateService; 

        public SolicitationStateController(
            ISolicitationStateService solicitationStateService
        )
        {
            _solicitationStateService = solicitationStateService;
        }

        [HttpPut("AddFielNumberDto")]
        [Authorize]
        public IActionResult AddFielNumber([FromBody] AddFielNumberDto fields)
        {
            var result = _solicitationStateService.AddFielNumber(fields);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }
    }
}
