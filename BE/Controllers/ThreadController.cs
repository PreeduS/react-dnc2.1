using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.IRepos;
using App.Models;
using App.Repos;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    [Route("Thread")]
    public class ThreadController : Controller{
        private readonly ICommentRepo Repo;
        public ThreadController(ICommentRepo r){
            Repo = r;
        }

        [Route("")]
        public IActionResult Index(){
            return Content("Template index");
        }

        [Route("LoadComments/{ThreadId}")] 
        public async Task<IActionResult> LoadComments(int ThreadId){
            IEnumerable<Comment> result =  await Repo.LoadCommentsAsync(ThreadId);

            return Json(result);
        }

        [Route("LoadMoreComments")]
        public async Task<IActionResult> LoadMoreComments(LoadMoreCommentsRequestModel req){
            if(!ModelState.IsValid){
                return BadRequest("Err validation");
            }            
            int ThreadId = req.ThreadId;          
            int LastId = req.LastId;

            IEnumerable<Comment> result = await Repo.LoadMoreCommentsAsync(ThreadId, LastId);
            
            return Content("");
        }



        [Route("AddComment")]
        public IActionResult AddComment(){

            string UserId = "1"; //temp

            Repo.Add( new Comment(){
                Content = "Comment 4",
                GroupId = 2,
                ReplyTo = 1,
                ThreadId = 1,
                UserId = UserId
            });

            Repo.SaveChanges();

            return Content("Test index");
        }

        [Route("AddReply")]
        public IActionResult AddReply(/*[FromBody]*/ AddReplyRequestModel reply){

            if(!ModelState.IsValid){
                return BadRequest("Err validation");
            }

            string ReplyContent = reply.Content;
            int ReplyTo = reply.ReplyTo;
            int ThreadId = reply.ThreadId;
            string UserId = "1"; //temp

            var result = Repo.Find(c => c.Id == ReplyTo && c.ThreadId == ThreadId).FirstOrDefault();
            if(result == null){
                return BadRequest("Err no reply");
            }
            
            int ?GroupId = result.GroupId == null ? result.Id : result.GroupId;
            if(GroupId == null){
                return BadRequest("Err no reply");
            }

            Repo.Add( new Comment(){
                Content = ReplyContent,
                ReplyTo = ReplyTo,
                GroupId = GroupId,
                ThreadId = 1,
                UserId = UserId              
            });

            if( Repo.SaveChanges() > 0){
                return Content("Reply Added");
            }
            return Content("Error");

        }


        [Route("LoadMoreReplies")]
        public IActionResult LoadMoreReplies(LoadMoreRepliesRequestModel req){
            if(!ModelState.IsValid){
                return BadRequest("Err validation");
            }
            int CommentGroupId = req.CommentGroupId;
            int LastReplyId = req.LastReplyId;
            int ThreadId = req.ThreadId;

            IEnumerable<Comment> result = Repo.Find(r => 
                r.GroupId == CommentGroupId && 
                r.Id > LastReplyId && 
                r.ThreadId == ThreadId 
            ).OrderBy(r => r.Id);


            return Json(result);
        }


    }

    public class AddReplyRequestModel{
        [Required]
        public string Content { get; set; }
        [Required]
        public int ReplyTo { get; set; }
        [Required]
        public int ThreadId { get; set; }
    }
    public class LoadMoreCommentsRequestModel{
        [Required]
        public int LastId { get; set; }
        [Required]
        public int ThreadId { get; set; }
    }
    public class LoadMoreRepliesRequestModel{

        [Required]
        public int CommentGroupId { get; set; }
        [Required]
        public int LastReplyId { get; set; }
        [Required]
        public int ThreadId { get; set; }
    }
}