using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using server.models;
using Audit.EntityFramework;

namespace server.Models
{
    public class DataContext : AuditIdentityDbContext<User, Role, Guid>
    {

        public DataContext(DbContextOptions<DataContext> ConnectionStrings)
            : base(ConnectionStrings)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<File> Files { get; set; }
    }
}