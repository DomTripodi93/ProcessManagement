using System;

namespace Backend.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public int EmployeeId { get; set; }
        public string ObjectiveName { get; set; }
        public string DeptName { get; set; }
        public DateTime Date { get; set; }
        
    }
}