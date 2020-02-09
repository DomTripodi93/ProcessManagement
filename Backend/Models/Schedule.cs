using System;

namespace Backend.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string EmployeeId { get; set; }
        public string ObjectiveName { get; set; }
        public string deptName { get; set; }
        public DateTime Date { get; set; }
        
    }
}