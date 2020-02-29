using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ScheduleForCreationDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        
        [Required]
        public string ObjectiveName { get; set; }
        public string deptName { get; set; }

        [Required]
        public DateTime Date { get; set; }
        
    }
}