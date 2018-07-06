
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Commons;
using App.IRepos;
using App.Models;
using App.Repos;
using App.RequestModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace App.Controllers{
    [Route("UserManager")]
    public class UserManager : Controller{
        private readonly IUserManagerRepo Repo;
        public UserManager(IUserManagerRepo r){
            Repo = r;
        }


        [Route("Register")]
        public async Task<IActionResult> Register(RegisterRequestModel user){

            if(!ModelState.IsValid){
                return BadRequest(new {Success = false, Errors = Validation.GetErrors(ModelState)} );
            }

            var result = await Repo.RegisterAsync(user.Username, user.Email, user.Password);

            if(result.Succeeded){
                return Json(new {Success = true});
            }else{
                var errors = result.Errors.Select(e => new {
                    Code = e.Code,
                    Description = e.Description
                });

                return BadRequest(new {Success = false, Errors = errors});
            }
        
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginRequestModel user){

            if(User.Identity.IsAuthenticated){  //signInManager.IsSignedIn(User);
                 return BadRequest(new {Success = false, Errors = "Already logged in as: "+ User.Identity.Name});
            }

            if(!ModelState.IsValid){
                return BadRequest(new {Success = false, Errors = Validation.GetErrors(ModelState)} );
            }       

            var result = await Repo.LoginAsync(user.Username, user.Password);
       
            if(result.Succeeded){
                return Json(new {Success = true});
            }else{
                var IsLockedOut = result.IsLockedOut ? "IsLockedOut" : null;
                var IsNotAllowed = result.IsNotAllowed ? "IsNotAllowed" : null;
                var errors = IsLockedOut ?? IsNotAllowed ?? "Wrong username of password";
                return BadRequest(new {Success = false, Errors = errors});
            }
        }
        [Route("Logout")]
        public IActionResult Logout(){
            Repo.Logout();
            return Json(new {Success = true});
        }


        
    }

}