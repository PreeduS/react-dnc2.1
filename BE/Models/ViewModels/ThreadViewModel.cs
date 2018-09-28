using System.ComponentModel.DataAnnotations;


namespace App.ViewModels{

    public class ThreadViewModel {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string Username { get; set; }    //UserId

        //public List<Comment> Comments { get; set; }



    }

}