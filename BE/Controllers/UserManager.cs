
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.IRepos;
using App.RequestModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace App.Controllers{
    [Route("UserManager")]
    public class UserManager : Controller{
        private readonly IUserManagerRepo Repo;
        public UserManager(IUserManagerRepo r){
            Repo = r;
        }

        private IEnumerable<object> GetValidationErrors(ModelStateDictionary modelState){
                var errors = modelState.Values.Select(e => new {
                    RawValue = e.RawValue,
                    Errors = e.Errors.Select(e2 => new {
                        Message = e2.ErrorMessage
                    })
                });
                return errors;
        }


        [Route("Register")]
        public async Task<IActionResult> Register(RegisterRequestModel user){

            if(!ModelState.IsValid){
                return BadRequest(new {Success = false, Errors = GetValidationErrors(ModelState)} );
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



        
    }

}