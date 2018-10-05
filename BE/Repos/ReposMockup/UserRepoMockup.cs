using System;
using System.Collections.Generic;
using System.Linq;
using App.IRepos;
using App.Models;
using App.Repos;

namespace App.ReposMockup{

    public class UserRepoMockup : Repository<ApplicationUser>, IUsersRepo{
        private readonly AppDbContext Context;
        public UserRepoMockup(AppDbContext context) : base(context){
            Context = context;
        }
        public List<ApplicationUser> GetUsers(){

            List<ApplicationUser> resultVModel = new List<ApplicationUser>();

            Enumerable.Range(1,10).ToList().ForEach( id => resultVModel.Add(
                new ApplicationUser{
                    Id = Guid.NewGuid().ToString(), UserName = "Username"+id
                }
            ));

            return resultVModel;

        }

    }
}