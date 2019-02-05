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
    public class DestinyController : ControllerBase
    {
        private readonly IDestinyService _service;

        public DestinyController(IDestinyService service)
        {
            _service = service;
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(Guid id)
        {
            var result = _service.Delete(id);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        [HttpGet("Get_Destiny/{id}")]
        public IActionResult Get_Destiny(Guid id)
        {
            var result = _service.Get_DestiniesProcedure(id);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }
            return Ok(result.Response);
        }
    }
}
