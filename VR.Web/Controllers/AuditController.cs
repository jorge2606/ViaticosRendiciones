using System;
using Audit.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class AuditController : ControllerBase
    {
        private IUserAuditService _userService;

        public AuditController(IUserAuditService userService)
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
