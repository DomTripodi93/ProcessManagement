using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ObjectiveForCreationDto
    {
        [Required]
        public string ObjectiveName { get; set; }
        public string Goal { get; set; }
        public string Time { get; set; }
        
    }
}