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
        [Authorize]
        public IActionResult Get_Report_SolicitationByUser(Guid userId)
        {
            var result = _reportService.PrintReportSolicitationSubsidyByUser(userId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }

        [HttpGet("Report_SolicitationByOrganism/{organismId}")]
        [Authorize]
        public IActionResult Get_Report_SolicitationByOrganism(Guid organismId)
        {
            var result = _reportService.PrintReportSolicitationSubsidyByOrganism(organismId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }


        [HttpGet("Report_SolicitationByDestiniesAndDates")]
        [Authorize]
        public IActionResult Report_SolicitationByDestiniesAndDates([FromQuery] ReportByDestiniesAndDatesDto param)
        {
            param.CityId = param.CityId.Equals(Guid.Empty) ? null : param.CityId;
            param.CountryId = param.CountryId.Equals(Guid.Empty) ? null : param.CountryId;
            param.ProvinceId = param.ProvinceId.Equals(Guid.Empty) ? null : param.ProvinceId;
            var result = _reportService.PrintReport_SolicitationByDestiniesAndDates(param);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }

        [HttpGet("SolicitationsPendingProcedure")]
        [Authorize]
        public IActionResult Report_SolicitationsPendingProcedure()
        {
            var result = _reportService.SolicitationsPendingProcedure();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }

        [HttpGet("SolicitationsExpireProcedure")]
        [Authorize]
        public IActionResult Report_SolicitationsExpireProcedure()
        {
            var result = _reportService.SolicitationsExpireProcedure();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }

        [HttpGet("ExpenditureProcedure")]
        [Authorize]
        public IActionResult Report_ExpenditureProcedure()
        {
            var result = _reportService.ExpenditureProcedure();
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return File(result.Response, "application/pdf");
        }
    }
}
