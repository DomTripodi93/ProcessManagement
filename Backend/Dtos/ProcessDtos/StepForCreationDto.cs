using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class StepForCreationDto
    {
        [Required]
        public string objectiveName { get; set; }
        
        [Required]
        public string deptName { get; set;}
        
        [Required]
        public string StepNumber { get; set; }

        [Required]
        public string Name { get; set; }
        public string Goal { get; set; }
        
    }
}