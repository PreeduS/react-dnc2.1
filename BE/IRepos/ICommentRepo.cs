using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;

namespace App.IRepos{
    public interface ICommentRepo : IRepository<Comment>{
        Task<IEnumerable<Comment>> LoadCommentsAsync(int ThreadId);   
        Task<IEnumerable<Comment>> LoadMoreCommentsAsync( int ThreadId, int LastId);
        
    }

}