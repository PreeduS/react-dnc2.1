using System;
using System.Collections.Generic;
using System.Linq;
using App.IRepos;
using App.Repos;
using App.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.Extensions.Configuration;
using App.Config;
using Microsoft.AspNetCore.Identity;

namespace App
{
    public class Startup
    {
        public IConfiguration Configuration {get; set; }
        public Startup(IConfiguration configuration){
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services){

            services.AddMvc(options => options.Conventions.Insert(0,new ModeRouteConvention()));


            if(false){
                services.AddDbContext<AppDbContext>(option => option.UseSqlite(Configuration["db:connectionString"]) );
            }else{

                services.AddEntityFrameworkNpgsql().AddDbContext<AppDbContext>( options => 
                    options.UseNpgsql("Server=localhost;Database=App;Username=postgres;Password=123456")
                );
            }

            services.AddTransient<ICommentRepo, CommentRepo>();
            services.AddTransient<IUserManagerRepo, UserManagerRepo>();

            //Identity
            services.AddIdentity<ApplicationUser,IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()                                       //.AddErrorDescriber<IdentityErrorDescriber>()
            .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>{
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options => {
                options.ExpireTimeSpan = TimeSpan.FromDays(14);
                options.Cookie.Expiration = TimeSpan.FromDays(14);
                //options.LoginPath = "/path/path";
            });



        }

        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env){

            if (env.IsDevelopment()){
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
         
            app.UseStaticFiles( new StaticFileOptions(){
                FileProvider = new PhysicalFileProvider( Path.Combine(Directory.GetCurrentDirectory(), "FE","build") ),
                RequestPath = ""            
            });            
            app.UseMvc();
            app.UseMvc(routes =>{
                    routes.MapRoute( 
                        name: "fallback-route-fe", 
                        template: "{*url}",
                        defaults: new { controller = "app", action = "index" }
                    );                                         
                }
            );

            /*app.Run(async (context) => {
                await context.Response.WriteAsync("Hello World!");
            });*/
        }
    }
}
