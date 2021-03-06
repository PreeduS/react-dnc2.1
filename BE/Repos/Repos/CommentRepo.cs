using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.IRepos;
using App.Models;
using App.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.Repos{

   
    public class CommentRepo : Repository<Comment>, ICommentRepo{
        private readonly AppDbContext Context;
        public CommentRepo(AppDbContext context) : base(context){
            Context = context;
        }

        private List<CommentViewModel> MapComments(IEnumerable<CommentViewModel> result){
            List<CommentViewModel> resultVModel = result.Where(x => x.GroupId == null)
            .Select( x => new CommentViewModel{
                Id = x.Id,
                Content = x.Content,
                NrReplies = x.NrReplies,
                ThreadId = x.ThreadId,
                UserId = x.UserId,
                //Replies = new List<Comment>(){}
                Replies = new List<ReplyViewModel>(){}

            }).ToList();

            result.Where(x => x.GroupId != null).GroupBy(x => x.GroupId).ToList().ForEach(x => {
                Console.WriteLine(x.Key);
                var RepliesToAdd = result.Where(y => y.GroupId == x.Key).Select(r => new ReplyViewModel{
                    Id = r.Id,
                    Content = r.Content,
                    NrReplies = r.NrReplies,
                    ThreadId = r.ThreadId,
                    UserId = r.UserId,
                    ReplyTo = r.ReplyTo,
                    GroupId = r.GroupId,
                }).ToList(); 

                resultVModel.Find(r => r.Id == x.Key).Replies.AddRange(RepliesToAdd);
            });
            
           // Console.WriteLine(resultVModel);
            return resultVModel;
        }
        public async Task<IEnumerable<CommentViewModel>> LoadCommentsAsync(int ThreadId){
            /*var result = await Context.Set<Comment>()
                .FromSql("SELECT * from getComments({0})", ThreadId).ToListAsync();
            var result = await Context.Database
                .ExecuteSqlCommandAsync("SELECT * from getComments({@ThreadId})",
                 new SqlParameter("@ThreadId",ThreadId));
*/
            var result = await Context.CommentDbQuery
                .FromSql("SELECT * from getComments({0})", ThreadId).ToListAsync();
            List<CommentViewModel> resultVModel = MapComments(result);

            return resultVModel;
        }
        //LoadMoreComments
        public async Task<IEnumerable<CommentViewModel>> LoadMoreCommentsAsync( int ThreadId, int LastId){
           /* var result = await Context.Set<Comment>()
                .FromSql("SELECT * from getComments({0},{1})", ThreadId, LastId).ToListAsync();
*/

            var result = await Context.CommentDbQuery
                .FromSql("SELECT * from getComments({0},{1})", ThreadId, LastId).ToListAsync();

            List<CommentViewModel> resultVModel = MapComments(result);

            return resultVModel;
        }
        
    }



}