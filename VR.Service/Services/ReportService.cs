﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Reporting;
using AspNetCore.Reporting.ReportExecutionService;
using AspNetCore.ReportingServices.ReportProcessing.ReportObjectModel;
using Microsoft.AspNetCore.Mvc;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    
    public class ReportService : IReportService
    {
        private static string StaticFilesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles");
        private readonly ISolicitationSubsidyService _solicitationSubsidyService;
        private readonly IDestinyService _destinyService;
        private readonly DataContext _context;


        public ReportService(
            ISolicitationSubsidyService solicitationSubsidyService,
            IDestinyService destinyService,
            DataContext context
            )
        {
            _solicitationSubsidyService = solicitationSubsidyService;
            _destinyService = destinyService;
            _context = context;
        }

        public ServiceResult<byte[]> ReportPrintAsync(Guid solicitationId)
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "VR_REPORT.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);
            var solic = _solicitationSubsidyService.GetByIdSubsidy(solicitationId).Response;
            if (solic == null)
            {
                notif.AddError("Error","La solicitud no existe");
                return notif;
            }
            var destiny = _destinyService.Get_DestiniesProcedure(solicitationId).Response;
            var images = _solicitationSubsidyService.SolicitationApprovedBySupervisorId(solicitationId, solic.UserId).Response;
            //var TotalLetter = _context.GetLetterNumberTotalSolicitationAsync(solic.Total.ToString(), ",");
            rv.AddDataSource("SolicitationDTODataSet", new List<FindByIdSolicitationSubsidyDto>() { solic });
            rv.AddDataSource("UserDataSet",new List<UserDto>(){solic.User});
            rv.AddDataSource("Destination", destiny);
            rv.AddDataSource("SignSupervisorImage",new List<UrlSignHolograph>(){ images });
            rv.AddDataSource("DestinationDataSet", solic.Destinies);
            rv.AddDataSource("ExpenditureDataSet", solic.Expenditures);
            rv.AddDataSource("Common", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToString("d")
                }
            });
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }

        public ServiceResult<byte[]> PrintAccountFor(Guid solicitationId)
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "Rendición.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var solic = _solicitationSubsidyService.GetByIdSubsidy(solicitationId).Response;
            if (solic == null)
            {
                notif.AddError("Error","La solicitud no existe.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);
            rv.AddDataSource("UserDataSet", new List<UserDto>() { solic.User });
            rv.AddDataSource("OrganismDataSet", new List<OrganismBaseDto>() { new OrganismBaseDto()
            {
                Name = _context.Distributions.FirstOrDefault(x => x.Id == solic.User.DistributionId).Name
            } });
            rv.AddDataSource("DestinationDataSet", solic.Destinies);
            rv.AddDataSource("ExpenditureDataSet", solic.Expenditures);
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }
    }
}
