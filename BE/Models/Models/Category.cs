using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace App.Models{

    public class Category {
        
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        

        public List<Thread> Threads { get; set; }


    }

}