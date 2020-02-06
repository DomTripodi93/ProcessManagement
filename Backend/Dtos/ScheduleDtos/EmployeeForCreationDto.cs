using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class EmployeeForCreationDto
    {
        public string Department { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool CanEdit { get; set; }
        
    }
}