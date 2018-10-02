

using App.ViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace App.Models{

    //public class AppDbContext : DbContext{
    public class AppDbContext : IdentityDbContext<ApplicationUser>{
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbQuery<CommentViewModel> CommentDbQuery { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            //Thread
            modelBuilder.Entity<Thread>()
                .HasMany(e => e.Comments).WithOne()
                .HasForeignKey(e => e.ThreadId)
                .IsRequired();


            modelBuilder.Entity<Thread>().Property(p => p.Id).UseNpgsqlIdentityAlwaysColumn();

            modelBuilder.Entity<Thread>().Property(p => p.LogoPath).IsRequired(required:false);

            //Category
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Threads).WithOne( t => t.Category) 
                .HasForeignKey(t => t.CategoryId)
                .IsRequired();

            modelBuilder.Entity<Category>().HasIndex(p => p.Name).IsUnique();
    
            //Comment
            modelBuilder.Entity<Comment>().Property(p => p.GroupId).IsRequired(required:false);
            modelBuilder.Entity<Comment>().Property(p => p.ReplyTo).IsRequired(required:false);


            //ApplicationUser
            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Threads).WithOne(t => t.User)
                .HasForeignKey(t => t.UserId).HasPrincipalKey(u => u.Id)
                .IsRequired();

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Comments).WithOne(c => c.User)
                .HasForeignKey(c => c.UserId).HasPrincipalKey(u =>u.Id)
                .IsRequired();


        }

    }

}