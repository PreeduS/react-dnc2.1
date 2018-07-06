using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    public class AppController : Controller{
        public IActionResult FeFallback(){
            var path = Path.Combine(Directory.GetCurrentDirectory(),"FE","build","index.html");
            return PhysicalFile(path, "text/html");
        }
        public IActionResult BeFallback(){
            return NotFound();
        }
        public IActionResult Login(){
            Response.StatusCode = 400;
            return Content("Not Logged In");
        }
    }
}