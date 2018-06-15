

using Microsoft.EntityFrameworkCore;

namespace App.Models{

    public class AppDbContext : DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Thread> Threads { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Thread>()
                .HasMany(e => e.Comments).WithOne()
                .HasForeignKey(e => e.ThreadId)
                .IsRequired();

        }

    }

}