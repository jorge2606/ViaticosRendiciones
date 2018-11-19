using Microsoft.EntityFrameworkCore;

namespace Audit.Data
{
    public class AuditContext : DbContext
    {
        public AuditContext()
        {
        }

        public AuditContext(DbContextOptions<AuditContext> ConnectionStrings)
            : base(ConnectionStrings)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Data Source=.\\SQLEXPRESS;Initial Catalog=Audits;Integrated Security = True;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        public virtual DbSet<Audit_Notification> Audit_Notifications { get; set; }
        public virtual DbSet<Audit_User> Audit_Users { get; set; }
    }
}
