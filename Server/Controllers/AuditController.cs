using System;
using Audit.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class AuditController : ControllerBase
    {
        private IUserService _userService;

        public AuditController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("userAudits/{userId}")]
        public ActionResult UserAudits(Guid userId)
        {
            var result = _userService.GetUserAudit(userId);

            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result.Response);
        }
    }
}
