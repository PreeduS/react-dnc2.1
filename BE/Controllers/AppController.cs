using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers{
    public class AppController : Controller{
        public IActionResult Index(){
            var path = Path.Combine(Directory.GetCurrentDirectory(),"FE","index.html");
            return PhysicalFile(path, "text/html");
        }
    }
}