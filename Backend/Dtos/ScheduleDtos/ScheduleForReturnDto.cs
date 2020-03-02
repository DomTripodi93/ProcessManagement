using System;

namespace Backend.Dtos
{
    public class ScheduleForReturnDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string ObjectiveName { get; set; }
        public string deptName { get; set; }
        public DateTime Date { get; set; }
        
    }
}