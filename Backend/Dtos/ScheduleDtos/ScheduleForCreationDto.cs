using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ScheduleForCreationDto
    {
        [Required]
        public string EmployeeId { get; set; }
        
        [Required]
        public string ObjectiveName { get; set; }
        public string DeptName { get; set; }

        [Required]
        public DateTime Date { get; set; }
        
    }
}