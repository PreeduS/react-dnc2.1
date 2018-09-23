using System.Linq;
using App.IRepos;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    [Route("Users")]
    public class UsersController : Controller{
        private readonly IUsersRepo Repo;
        public UsersController(IUsersRepo r){
            Repo = r;
        }
        [Route("GetUsers")]
        public IActionResult GetUsers(){
            return Json(Repo.GetUsers().Select(x => new {
                Username = x.UserName
            }));
        }        
    }
}