using System.Collections.Generic;
using App.IRepos;
using App.Models;
using App.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    [Route("Threads")]
    public class ThreadsController : Controller{

        private readonly IThreadsRepo Repo;

        public ThreadsController(IThreadsRepo r){
            Repo = r;
        }

        [Route("GetThreads")]
        public IActionResult GetThreads(){
            List<Thread> result = Repo.GetThreads();

            List<ThreadsViewModel> resultViewModel = Commons.Mapper<Thread, ThreadsViewModel>.Map(result);

            return Json(resultViewModel);
        }
    }
}