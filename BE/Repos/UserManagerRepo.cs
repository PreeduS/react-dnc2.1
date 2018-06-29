
using System.Threading.Tasks;
using App.IRepos;
using App.Models;
using Microsoft.AspNetCore.Identity;

namespace App.Repos{

    public class UserManagerRepo : IUserManagerRepo{
        //private readonly AppDbContext Context;
        private readonly UserManager<ApplicationUser> UserManager;
        private readonly SignInManager<ApplicationUser> SignInManager;
        public UserManagerRepo( UserManager<ApplicationUser> userManager, 
                                SignInManager<ApplicationUser> signInManager){

        }

        public async Task<IdentityResult> RegisterAsync(string username, string email, string password){

            var user = new ApplicationUser{
                UserName = username,
                Email = email
            };            
            var result = await UserManager.CreateAsync(user, password);
            
            if(result.Succeeded){
                await SignInManager.SignInAsync(user,false);
            }
            return result;
        }
        public async Task<SignInResult> LoginAsync(string username, string password, bool rememberMe = false){
            //on ctrl
            /*if(User.Identity.IsAuthenticated){  //signInManager.IsSignedIn(User);
                 return Content("Already logged in as: "+ User.Identity.Name);
            }*/
            var result = await SignInManager.PasswordSignInAsync(username, password, rememberMe, lockoutOnFailure: false);
            return result;

           
        }

        public void Logout(){
            SignInManager.SignOutAsync();         
        }


        public async Task<bool> UserExists(string username){
            return await UserManager.FindByNameAsync(username) != null;
      
        }
    }
}