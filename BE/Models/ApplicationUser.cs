using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace App.Models{

    public class ApplicationUser : IdentityUser {
        public string TestProp;

        public List<Thread> Threads {get; set;}
    }    
}