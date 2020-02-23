using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class CommonDifficultyForCreationDto
    {
        [Required]
        public string stepNumber { get; set; }

        [Required]
        public string objectiveName { get; set; }

        [Required]
        public string deptName { get; set; }
        
        [Required]
        public string Difficulty { get; set; }
        public string Cause { get; set; }
        public string Solution { get; set; }
        
    }
}