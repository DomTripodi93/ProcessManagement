using System;

namespace Backend.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public Employee Employee { get; set; }
        public Objective Objective { get; set; }
        public string DeptName { get; set; }
        public DateTime Date { get; set; }
        
    }
}