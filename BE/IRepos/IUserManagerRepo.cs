using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using App.Models;
using Microsoft.AspNetCore.Identity;

namespace App.IRepos{
    public interface IUserManagerRepo{
       // Task<IEnumerable<Comment>> LoadCommentsAsync(int ThreadId);   
       // Task<IEnumerable<Comment>> LoadMoreCommentsAsync( int ThreadId, int LastId);

        Task<bool> UserExists(string username);
        Task<IdentityResult> RegisterAsync(string username, string email, string password);
        Task<SignInResult> LoginAsync(string username, string password, bool rememberMe = false);
        void Logout();
        Task<ApplicationUser> GetUserAsync(ClaimsPrincipal user);
        string GetUserId(ClaimsPrincipal user);
        Task<ApplicationUser> FindByNameAsync(string username);
        
    }

}