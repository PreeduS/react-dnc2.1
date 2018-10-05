
using System.Collections.Generic;
using System.Linq;
using App.IRepos;
using App.Models;

namespace App.Repos{

   
    public class UsersRepo : Repository<ApplicationUser>, IUsersRepo{
        private readonly AppDbContext Context;
        public UsersRepo(AppDbContext context) : base(context){

            Context = context;
        }
        public List<ApplicationUser> GetUsers(){
            return Context.Users.Take(10).ToList();
            //return UserManager.Users.Take(10).ToList();
        }
    }
}