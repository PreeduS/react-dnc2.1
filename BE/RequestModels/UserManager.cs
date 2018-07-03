using System.ComponentModel.DataAnnotations;

namespace App.RequestModels{

    public class RegisterRequestModel{
        [Required]
        [MinLength(6, ErrorMessage = "Username must be at least 6 char characters")]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
    }
    public class LoginRequestModel{
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

    }
}