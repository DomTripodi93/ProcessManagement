using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class DepartmentForCreationDto
    {
        [Required]
        public string DeptName { get; set; }
        public string Function { get; set; }
        
    }
}