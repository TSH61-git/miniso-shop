using System.ComponentModel.DataAnnotations;

namespace MinisoShop.API.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "First name is required")]
        [MinLength(2, ErrorMessage = "First name must be at least 2 characters")]
        [RegularExpression(@"^[a-zA-Z\u0590-\u05FF\s]+$", ErrorMessage = "First name can only contain letters and spaces")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required")]
        [MinLength(2, ErrorMessage = "Last name must be at least 2 characters")]
        [RegularExpression(@"^[a-zA-Z\u0590-\u05FF\s]+$", ErrorMessage = "Last name can only contain letters and spaces")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
        public string Password { get; set; } = string.Empty;

        [Phone(ErrorMessage = "Invalid phone number format")]
        [RegularExpression(@"^[0-9]{9,15}$", ErrorMessage = "Phone number must be 9-15 digits")]
        public string? Phone { get; set; }

        [MinLength(2, ErrorMessage = "City must be at least 2 characters")]
        public string? City { get; set; }

        [MinLength(2, ErrorMessage = "Street must be at least 2 characters")]
        public string? Street { get; set; }
    }
}