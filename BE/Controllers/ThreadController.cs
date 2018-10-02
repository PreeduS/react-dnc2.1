using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.Commons;
using App.IRepos;
using App.Models;
using App.Repos;
using App.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Controllers{
    [Route("Thread")]
    public class ThreadController : Controller{
        private readonly ICommentRepo Repo;
        private readonly IUserManagerRepo UserManagerRepo;
        public ThreadController(ICommentRepo r, IUserManagerRepo userManagerRepo){
            Repo = r;
            UserManagerRepo = userManagerRepo;
        }

        [Route("")]
        public IActionResult Index(){
            return Content("Template index");
        }

        [Route("LoadComments")] 
        public async Task<IActionResult> LoadComments(int ThreadId){
            if(ThreadId == 0) {
                return BadRequest(new {Success = false, Errors = "Invalid arguments"} );
            }

            IEnumerable<CommentViewModel> result = await Repo.LoadCommentsAsync(ThreadId);

            return Json(result);
        }

        [Route("LoadMoreComments")]
        public async Task<IActionResult> LoadMoreComments(LoadMoreCommentsRequestModel req){
            if(!ModelState.IsValid){
                return BadRequest(new {Errors = Validation.GetErrors(ModelState)} );
            }            
            int ThreadId = req.ThreadId;          
            int LastId = req.LastId;

            IEnumerable<CommentViewModel> result = await Repo.LoadMoreCommentsAsync(ThreadId, LastId);
            
            return Json(result);
        }



        [Route("AddComment")]
        [Authorize]
        public IActionResult AddComment([FromBody] AddCommentRequestModel comment){
            
            //string UserId = "439e896d-d4d4-4c3e-937c-cd45d6f63dfe"; //temp
            string UserId = UserManagerRepo.GetUserId(User);
            //string UserId = "1"; //temp

            var newComment = new Comment(){
                Content = comment.Content,
                GroupId = null,
                ReplyTo = null,
                ThreadId = comment.ThreadId,
                UserId = UserId
            };
            Repo.Add(newComment);
            if( Repo.SaveChanges() > 0){
                //return Json(new {Success = true});
                return Json(newComment);                        //rem map to viewmodel
    
            }
            return BadRequest(new {Errors = ""} );     
            /*try{
                Repo.SaveChanges();
            }catch(DbUpdateException e){
                return BadRequest(new {Errors = e.InnerException.Message} );
            }
            return Json(new {Success = true});*/
        }

        [Route("AddReply")]
        [Authorize]
        public IActionResult AddReply([FromBody] AddReplyRequestModel reply){

            if(!ModelState.IsValid){
                return BadRequest(new {Errors = Validation.GetErrors(ModelState)} );          
            }
            
            string ReplyContent = reply.Content;
            int ReplyTo = reply.ReplyTo;
            int ThreadId = reply.ThreadId;
            //string UserId = "1"; //temp
            //string UserId = "439e896d-d4d4-4c3e-937c-cd45d6f63dfe";
            string UserId = UserManagerRepo.GetUserId(User);

            var result = Repo.Find(c => c.Id == ReplyTo && c.ThreadId == ThreadId).FirstOrDefault();
            if(result == null){
                return BadRequest(new {Errors = "No reply found"} );       
            }
            
            int ?GroupId = result.GroupId == null ? result.Id : result.GroupId;
            if(GroupId == null){
                return BadRequest(new {Errors = "No reply found"} );     
            }

            var NewReply = new Comment(){
                Content = ReplyContent,
                ReplyTo = ReplyTo,
                GroupId = GroupId,
                ThreadId = ThreadId,
                UserId = UserId              
            };


            Repo.Add(NewReply);

            if( Repo.SaveChanges() > 0){
                //return Json(new {Success = true});
                return Json(NewReply);
    
            }
            return BadRequest(new {Errors = ""} );     

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
    public class AddCommentRequestModel{
        [Required]
        public string Content { get; set; }
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