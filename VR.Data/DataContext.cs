using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using Audit.EntityFramework;
using VR.Data.Model;

namespace VR.Data
{
    public class DataContext : AuditIdentityDbContext<User, Role, Guid>
    {

        public DataContext(DbContextOptions<DataContext> ConnectionStrings)
            : base(ConnectionStrings)
        {
        }

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
    }
}