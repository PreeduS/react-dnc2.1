using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    [Route("Threads")]
    public class ThreadsController : Controller{
        [Route("GetThreads")]
        public IActionResult GetThreads(){

            return Content("getThreads placeholder");
        }
    }
}