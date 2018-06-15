using System.IO;
using App.IRepos;
using App.Models;
using Microsoft.AspNetCore.Mvc;

namespace App.Repos{

    [Route("Template")]
    //public class CommentRepo : ICommentRepo {
    public class CommentRepo : Repository<Comment>, ICommentRepo{
        private readonly AppDbContext Context;
        public CommentRepo(AppDbContext context) : base(context){
            Context = context;
        }

       /* public void Add(Comment entity){
            Context.Set<Comment>().Add(entity);         
        }
        public void AddRange(Comment entity){
            Context.Set<Comment>().Add(entity);         
        }


        public int SaveChanges(){
            return Context.SaveChanges();
        }
 */
    }
}