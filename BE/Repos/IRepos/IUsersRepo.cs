using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;
using App.Repos;
using App.ViewModels;

namespace App.IRepos{
    public interface IUsersRepo : IRepository<ApplicationUser>{
        List<ApplicationUser> GetUsers();
    }

}