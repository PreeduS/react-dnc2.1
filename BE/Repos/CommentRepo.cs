using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.IRepos;
using App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Repos{

   
    public class CommentRepo : Repository<Comment>, ICommentRepo{
        private readonly AppDbContext Context;
        public CommentRepo(AppDbContext context) : base(context){
            Context = context;
        }

        private List<CommentViewModel> MapComments(IEnumerable<Comment> result){
            List<CommentViewModel> resultVModel = result.Where(x => x.GroupId == null)
            .Select( x => new CommentViewModel{
                Id = x.Id,
                Content = x.Content,
                Replies = new List<Comment>(){}

            }).ToList();

            result.Where(x => x.GroupId != null).GroupBy(x => x.GroupId).ToList().ForEach(x => {
                Console.WriteLine(x.Key);
                var RepliesToAdd = result.Where(y => y.GroupId == x.Key).ToList(); 
                  Console.WriteLine("c "+RepliesToAdd.Count);
                resultVModel.Find(r => r.Id == x.Key).Replies.AddRange(RepliesToAdd);
            });
            
            Console.WriteLine(resultVModel);
            return resultVModel;
        }
        public async Task<IEnumerable<Comment>> LoadCommentsAsync(int ThreadId){
            var result = await Context.Set<Comment>()
                .FromSql("SELECT * from getComments({0})", ThreadId).ToListAsync();

            //List<CommentViewModel> resultVModel = MapComments(result);

            return result;
        }
        //LoadMoreComments
        public async Task<IEnumerable<Comment>> LoadMoreCommentsAsync( int ThreadId, int LastId){
            var result = await Context.Set<Comment>()
                .FromSql("SELECT * from getComments({0},{1})", ThreadId, LastId).ToListAsync();

            //List<CommentViewModel> resultVModel = MapComments(result);

            return result;
        }
        
    }

        public class CommentViewModel{
            public int Id { get; set; }
            public string Content { get; set; }
            public int ReplyTo { get; set; }
            public int ?GroupId { get; set; }
            public int ThreadId { get; set; }
            //public int UserId { get; set; } //fk
            public List<Comment> Replies{ get; set; }
        }

}