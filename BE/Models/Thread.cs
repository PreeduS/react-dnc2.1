using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace App.Models{

    public class Thread {
        
        [Key]
        public int Id { get; set; }

        public string Content { get; set; }
        public string Category { get; set; }
        public int UserId { get; set; }

        public List<Comment> Comments { get; set; }



    }

}