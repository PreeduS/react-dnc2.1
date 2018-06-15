using System.IO;
using App.IRepos;
using App.Models;
using App.Repos;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    [Route("Template")]
    public class TemplateController : Controller{
        private readonly AppDbContext ctx;
        private readonly ICommentRepo repo;
        public TemplateController(AppDbContext c, ICommentRepo r)
        {
            ctx = c;
            repo = r;
        }

        [Route("")]
        public IActionResult Index(){
            return Content("Template index");
        }
        [Route("Test")]
        public IActionResult Test(){

            //c
            /*ctx.Comments.Add( new Comment(){
                Text = "Comment 1"
            });*/
            /* 
            ctx.Set<Comment>().Add( new Comment(){
                Text = "Comment 2"
            });
            */
            
            repo.Add( new Comment(){
                Content = "Comment 4"
            });

            repo.SaveChanges();

            return Content("Test index");
        }
    }
}