using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.ViewModels{

        public class CommentViewModel{
            public int Id { get; set; }
            public string Content { get; set; }
            public int ?ReplyTo { get; set; }
            public int ?GroupId { get; set; }
            public int NrReplies { get; set; }
            public string UserId { get; set; }
            public int ThreadId { get; set; }
            //public int UserId { get; set; } //fk
            [NotMapped]
            public List<ReplyViewModel> Replies{ get; set; }
        }
}