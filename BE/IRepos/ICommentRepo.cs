using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;
using App.Repos;

namespace App.IRepos{
    public interface ICommentRepo : IRepository<Comment>{
        Task<IEnumerable<CommentViewModel>> LoadCommentsAsync(int ThreadId);   
        Task<IEnumerable<CommentViewModel>> LoadMoreCommentsAsync( int ThreadId, int LastId);
        
    }

}