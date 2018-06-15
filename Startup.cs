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

namespace App
{
    public class Startup
    {
        public IConfiguration Configuration {get; set; }
        public Startup(IConfiguration configuration){
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services){

            services.AddMvc();


            if(true){
                services.AddDbContext<AppDbContext>(option => option.UseSqlite(Configuration["db:connectionString"]) );
            }else{

                services.AddEntityFrameworkNpgsql().AddDbContext<AppDbContext>( options => 
                    options.UseNpgsql("Server=localhost;Database=App;Username=postgres;Password=123456")
                );
            }
            //TemplateRepo ICommentRepo
            //services.AddScoped<TemplateRepo<AppDbContext>>();
            
            services.AddTransient<ICommentRepo, CommentRepo>();
        }

        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env){

            if (env.IsDevelopment()){
                app.UseDeveloperExceptionPage();
            }
         
            app.UseStaticFiles( new StaticFileOptions(){
                FileProvider = new PhysicalFileProvider( Path.Combine(Directory.GetCurrentDirectory(), "FE") ),
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
