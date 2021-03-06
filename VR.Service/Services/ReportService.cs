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
using Newtonsoft.Json;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Data.Model.ModelStoreProcedure;
using VR.Dto;
using VR.Dto.User;
using VR.Service.Interfaces;
using VR.Web.Helpers;
using User = VR.Data.Model.User;

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

        public ServiceResult<byte[]> PrintReportSolicitationSubsidyByUser(Guid userId)
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "SolicitationSubsidyByUser.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);
            var user = _context.Users.FirstOrDefault(c => c.Id == userId);
            var solicitation = _context.Report_SolicitationByUserProcedure(userId);

            if (solicitation.Count() > 0)
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByUser>(solicitation));
            }
            else
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByUser>()
                {
                    new SolicitationSubsidyByUser()
                });
            }
            
            rv.AddDataSource("CommonDataSet", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToShortDateString()
                }
            });
            rv.AddDataSource("UserDataSet", new List<User>(){user});
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }

        public ServiceResult<byte[]> PrintReportSolicitationSubsidyByOrganism(Guid organismId)
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "SolicitationSubsidyByOrganism.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);
            var organismResult = _context.Organisms.FirstOrDefault(x => x.Id == organismId);

            var solicitation = _context.Report_SolicitationByOrganism(organismId);

            
            if (solicitation.Count() > 0)
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>(solicitation));
            }
            else
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>()
                {
                    new SolicitationSubsidyByOrganism()
                });
            }
            rv.AddDataSource("OrganismDataSet", new List<Organism>(){ organismResult });
            rv.AddDataSource("CommonDataSet", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToShortDateString()
                }
            });
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }

        public ServiceResult<byte[]> PrintReport_SolicitationByDestiniesAndDates(ReportByDestiniesAndDatesDto reportByDestiniesAndDates)
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "SolicitationSubsidyByDestinationAndDate.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }

            reportByDestiniesAndDates.CityId = reportByDestiniesAndDates.CityId.Equals(Guid.Empty) ? null : reportByDestiniesAndDates.CityId;
            reportByDestiniesAndDates.CountryId = reportByDestiniesAndDates.CountryId.Equals(Guid.Empty) ? null : reportByDestiniesAndDates.CountryId;
            reportByDestiniesAndDates.ProvinceId = reportByDestiniesAndDates.ProvinceId.Equals(Guid.Empty) ? null : reportByDestiniesAndDates.ProvinceId;
            reportByDestiniesAndDates.StartDate = new DateDto()
            {
                Day = reportByDestiniesAndDates.StartDateDay,
                Month = reportByDestiniesAndDates.StartDateMonth,
                Year = reportByDestiniesAndDates.StartDateYear
            };
            reportByDestiniesAndDates.EndDate = new DateDto()
            {
                Day = reportByDestiniesAndDates.EndDay,
                Month = reportByDestiniesAndDates.EndMonth,
                Year = reportByDestiniesAndDates.EndYear
            };

            var rv = new LocalReport(newDirectory);
            DateTime? startDate = null;
            DateTime? endDate = null;
            if (reportByDestiniesAndDates.StartDate != null 
                && !reportByDestiniesAndDates.StartDate.Day.Equals(0)
                && !reportByDestiniesAndDates.StartDate.Month.Equals(0)
                && !reportByDestiniesAndDates.StartDate.Year.Equals(0))
            {
                startDate = reportByDestiniesAndDates.StartDate.ToDateTime();
            }

            if (reportByDestiniesAndDates.EndDate != null
                && !reportByDestiniesAndDates.EndDate.Day.Equals(0)
                && !reportByDestiniesAndDates.EndDate.Month.Equals(0)
                && !reportByDestiniesAndDates.EndDate.Year.Equals(0))
            {
                endDate = reportByDestiniesAndDates.EndDate.ToDateTime();
            }
            var solicitation = _context.Report_SolicitationByDestiniesAndDates(
                startDate,
                endDate,
                reportByDestiniesAndDates.CountryId,
                reportByDestiniesAndDates.CityId,
                reportByDestiniesAndDates.ProvinceId
                );

            
            if (solicitation.Count() > 0)
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>(solicitation));
            }
            else
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>()
                {
                    new SolicitationSubsidyByOrganism()
                });
            }
            rv.AddDataSource("CommonDataSet", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToShortDateString()
                }
            });
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }

        public ServiceResult<byte[]> SolicitationsPendingProcedure()
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "SolicitationsPendingProcedure.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);

            var solicitation = _context.SolicitationsPendingProcedure();

            if (solicitation.Count() > 0)
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>(solicitation));
            }
            else
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>()
                {
                    new SolicitationSubsidyByOrganism()
                });
            }
            rv.AddDataSource("CommonDataSet", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToShortDateString()
                }
            });
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }

        public ServiceResult<byte[]> SolicitationsExpireProcedure()
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "SolicitationsExpireProcedure.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);

            var solicitation = _context.SolicitationsPendingProcedure();

            if (solicitation.Count() > 0)
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>(solicitation));
            }
            else
            {
                rv.AddDataSource("ReportSolicitationByUser", new List<SolicitationSubsidyByOrganism>()
                {
                    new SolicitationSubsidyByOrganism()
                });
            }
            rv.AddDataSource("CommonDataSet", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToShortDateString()
                }
            });
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }

        public ServiceResult<byte[]> ExpenditureProcedure()
        {
            var newDirectory = Path.Combine(StaticFilesDirectory, "Reports", "Expenditures.rdl");
            var files = new FileInfo(newDirectory);

            var notif = new ServiceResult<byte[]>();

            if (!files.Exists)
            {
                notif.AddError("Error", "El Reporte no fue encontrado.");
                return notif;
            }
            var rv = new LocalReport(newDirectory);

            var solicitation = _context.ExpenditureProcedure();

            if (solicitation.Count() > 0)
            {
                rv.AddDataSource("ExpenditureDataSet", new List<ExpenditureProcedureDto>(solicitation));
            }
            else
            {
                rv.AddDataSource("ExpenditureDataSet", new List<ExpenditureProcedureDto>()
                {
                    new ExpenditureProcedureDto()
                });
            }
            rv.AddDataSource("CommonDataSet", new List<ReportDto>()
            {
                new ReportDto()
                {
                    TodayDate = DateTime.Today.ToShortDateString()
                }
            });
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var result = rv.Execute(RenderType.Pdf);

            return new ServiceResult<byte[]>(result.MainStream);
        }


    }
}
