using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using Audit.EntityFramework;
using VR.Data.Model;
using VR.Web.Helpers;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Snickler.EFCore;
using System.Data.Common;

namespace VR.Data
{
    public class DataContext : AuditIdentityDbContext<User, Role, Guid>
    {

        public DataContext(DbContextOptions<DataContext> ConnectionStrings)
            : base(ConnectionStrings)
        {
        }

        public DataContext() { }

        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<File> Files { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Distribution> Distributions { get; set; }
        public virtual DbSet<Transport> Transports { get; set; }
        public virtual DbSet<Expenditure> Expenditures { get; set; }
        public virtual DbSet<Organism> Organisms { get; set; }
        public virtual DbSet<Place> Places { get; set; }
        public virtual DbSet<Destiny> Destinies { get; set; }
        public virtual DbSet<Motive> Motives { get; set; }
        public virtual DbSet<SolicitationSubsidy> SolicitationSubsidies { get; set; }
        public virtual DbSet<Holiday> Holidays { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<CodeLiquidation> CodeLiquidations { get; set; }
        public virtual DbSet<ExpenditureType> ExpenditureTypes { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<SolicitationState> SolicitationStates { set; get; }
        public virtual DbSet<SupervisorUserAgent> SupervisorUserAgents { set; get; }
        public virtual DbSet<SupplementaryCity> SupplementaryCities { set; get; }

        public PagedResult<AgentSolicitationBySupervisorResult> GetAgentsSolicitationBySupervisor(
            Guid supervisorId,
            string firstName,
            string lastName,
            string dni,
            string sortBy,
            Nullable<int> pageSize,
            Nullable<int> pageIndex)
        {
            
            var resultFull = new List<AgentSolicitationBySupervisorResult>();
            DbParameter totalRows = null;

            this.LoadStoredProc("dbo.get_agents_solicitation_by_supervisor")
                .WithSqlParam("@SupervisorId", supervisorId)
                .WithSqlParam("@FirstName", firstName)
                .WithSqlParam("@LastName", lastName)
                .WithSqlParam("@Dni", dni)
                .WithSqlParam("@SortBy", sortBy)
                .WithSqlParam("@PageSize", pageSize)
                .WithSqlParam("@PageIndex", pageIndex)
                .WithSqlParam("@PageTotal", (dbParam) =>
                {
                    dbParam.Direction = System.Data.ParameterDirection.Output;
                    dbParam.DbType = System.Data.DbType.Int32;
                    totalRows = dbParam;
                })
                .ExecuteStoredProc((handler) =>
                {
                    resultFull = (List<AgentSolicitationBySupervisorResult>)handler.ReadToList<AgentSolicitationBySupervisorResult>();
                    handler.NextResult();
                });

            return new PagedResult<AgentSolicitationBySupervisorResult>
            {
                List = resultFull,
                TotalRecords = (int)totalRows?.Value
            };
        }


        public PagedResult<AgentSolicitationBySupervisorResult> GetSolicitationsByAgent(
            Guid agentId,
            string firstName,
            string lastName,
            string dni,
            string sortBy,
            Nullable<int> pageSize,
            Nullable<int> pageIndex)
        {

            var resultFull = new List<AgentSolicitationBySupervisorResult>();

            DbParameter totalRows = null;

            this.LoadStoredProc("dbo.get_solicitations_by_agent")
                .WithSqlParam("@AgentId", agentId)
                .WithSqlParam("@FirstName", firstName)
                .WithSqlParam("@LastName", lastName)
                .WithSqlParam("@Dni", dni)
                .WithSqlParam("@SortBy", sortBy)
                .WithSqlParam("@PageSize", pageSize)
                .WithSqlParam("@PageIndex", pageIndex)
                .WithSqlParam("@PageTotal", (dbParam) =>
                {
                    dbParam.Direction = System.Data.ParameterDirection.Output;
                    dbParam.DbType = System.Data.DbType.Int32;
                    totalRows = dbParam;
                })
                .ExecuteStoredProc((handler) =>
                {
                    resultFull = (List<AgentSolicitationBySupervisorResult>)handler.ReadToList<AgentSolicitationBySupervisorResult>();
                    handler.NextResult();
                });
          
            return new PagedResult<AgentSolicitationBySupervisorResult>
            {
                List = resultFull,
                TotalRecords = (int)totalRows?.Value
            };
        }
    }
}