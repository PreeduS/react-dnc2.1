

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace App.Models{

    //public class AppDbContext : DbContext{
    public class AppDbContext : IdentityDbContext<ApplicationUser>{
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Thread> Threads { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Thread>()
                .HasMany(e => e.Comments).WithOne()
                .HasForeignKey(e => e.ThreadId)
                .IsRequired();
            
            modelBuilder.Entity<Thread>().Property(p => p.Id).UseNpgsqlIdentityAlwaysColumn();

            modelBuilder.Entity<Comment>().Property(p => p.GroupId).IsRequired(required:false);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Threads).WithOne(t => t.User)
                .HasForeignKey(t => t.UserId).HasPrincipalKey(u => u.Id)
                .IsRequired();

        }

    }

}