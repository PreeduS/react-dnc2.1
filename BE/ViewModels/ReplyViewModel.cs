using System.ComponentModel.DataAnnotations;

namespace App.ViewModels{

        public class ReplyViewModel{
            public int Id { get; set; }
            public string Content { get; set; }
            public int ?ReplyTo { get; set; }
            public int ?GroupId { get; set; }
            public int NrReplies { get; set; }
            public string UserId { get; set; }
            public int ThreadId { get; set; }

        }
}