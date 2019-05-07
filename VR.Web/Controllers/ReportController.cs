using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VR.Service.Interfaces;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(
            IReportService reportService
        )
        {
            _reportService = reportService;
        }
        // GET: api/Report
        [HttpGet("Report_SolicitationByUser/{userId}")]
        [AllowAnonymous]
        public IActionResult Get_Report_SolicitationByUser(Guid userId)
        {
            var result = _reportService.PrintReportSolicitationSubsidyByUser(userId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }

        // GET: api/Report/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Report
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Report/5
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
