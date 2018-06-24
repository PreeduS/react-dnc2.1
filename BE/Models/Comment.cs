using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace App.Models{

    public class Comment {
        
        [Key]
        public int Id { get; set; }

        public string Content { get; set; }
        public int ReplyTo { get; set; }
        public int ?GroupId { get; set; }
        public int ThreadId { get; set; }//fk
        public string UserId { get; set; } //fk //rem - add later

    }

}