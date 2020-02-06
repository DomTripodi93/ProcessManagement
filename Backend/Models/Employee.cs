using System.Collections.Generic;

namespace Backend.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public string Department { get; set; }
        public string Name { get; set; }
        public bool CanEdit { get; set; }
        public ICollection<Schedule> Schedule { get; set; }
        
    }
}