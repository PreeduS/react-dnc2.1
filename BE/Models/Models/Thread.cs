using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace App.Models{

    public class Thread {
        
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        //public string Category { get; set; }
        public string LogoPath { get; set; }
        public DateTime ?UploadDate { get; set; }
        public int CategoryId { get; set; }
        public string UserId { get; set; }
        public Category Category {get; set; }
        public ApplicationUser User {get; set; }
        public List<Comment> Comments { get; set; }



    }

}