﻿using System;
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
using App.Config.Extensions;
using App.ReposMockup;

namespace App{
    public class Startup
    {
        public IConfiguration Configuration {get; set; }
        public Startup(IConfiguration configuration){
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services){
            services.AddCors();
            services.AddMvc(options => options.Conventions.Insert(0,new ModeRouteConvention()));
            
       
            if(Configuration.UseMockups()){
                services.AddDbContext<AppDbContext>(option => option.UseInMemoryDatabase("TestDB") );

            }else if(Configuration.UseSqlite()){
                services.AddDbContext<AppDbContext>(option => option.UseSqlite(Configuration["db:sqlite:connectionString"]) );

            }else{
                services.AddEntityFrameworkNpgsql().AddDbContext<AppDbContext>( options => 
                    options.UseNpgsql(Configuration["db:postgre:connectionString"])
                );
            }

            if(Configuration.UseMockups()){
                services.AddTransient<ICommentRepo, CommentRepoMockup>();
                services.AddTransient<IUsersRepo, UserRepoMockup>();
            }else{
                services.AddTransient<ICommentRepo, CommentRepo>();
                services.AddTransient<IUsersRepo, UsersRepo>();
            }

            services.AddTransient<IUserManagerRepo, UserManagerRepo>();
            services.AddTransient<IThreadsRepo, ThreadsRepo>();


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
                options.LoginPath = "/api/App/Login";

            });

           services.AddSession(options => {
                options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
                
            });

        }

        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env){
            app.Use(async (context, next) => {
                System.Threading.Thread.Sleep(5000);
                await next.Invoke();
            });
            if (env.IsDevelopment()){
                app.UseDeveloperExceptionPage();
                app.UseCors(builder =>
                    builder
                    //.WithOrigins("http://localhost:3000")
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                );
            }

            app.UseAuthentication();
         
            app.UseStaticFiles( new StaticFileOptions(){
                FileProvider = new PhysicalFileProvider( Path.Combine(Directory.GetCurrentDirectory(), "FE","build") ),
                RequestPath = ""            
            });            
            app.UseMvc();
            app.UseMvc(routes =>{
                    routes.MapRoute( 
                        name: "login-route-be", 
                        template: "api/App/login",
                        defaults: new { controller = "App", action = "Login" }
                    );                
                    routes.MapRoute( 
                        name: "fallback-route-be", 
                        template: "api/{*url}",
                        defaults: new { controller = "App", action = "BeFallback" }
                    );                
                    routes.MapRoute( 
                        name: "fallback-route-fe", 
                        template: "{*url}",
                        defaults: new { controller = "App", action = "FeFallback" }
                    );                                         
                }
            );

            /*app.Run(async (context) => {
                await context.Response.WriteAsync("Hello World!");
            });*/
        }
    }
}
