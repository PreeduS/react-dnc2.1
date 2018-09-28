using System;
using System.ComponentModel.DataAnnotations;


namespace App.ViewModels{

    public class ThreadsViewModel {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public int NrComments { get; set; }
        //public DateTime UploadDate { get; set; }
        public string Username { get; set; }



    }

}