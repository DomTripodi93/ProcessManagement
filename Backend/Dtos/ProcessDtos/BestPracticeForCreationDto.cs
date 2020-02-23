using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class BestPracticeForCreationDto
    {

        [Required]
        public string stepNumber { get; set; }

        [Required]
        public string objectiveName { get; set; }

        [Required]
        public string deptName { get; set; }

        [Required]
        public string Practice { get; set; }
        public string Method { get; set; }
        public string Purpose { get; set; }
        
    }
}