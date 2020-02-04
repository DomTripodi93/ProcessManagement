using System.Collections.Generic;

namespace Backend.Models
{
    public class Department
    {
        public User User { get; set; }
        public int userId { get; set; }
        public ICollection<Task> Task { get; set; }
        public string DeptName { get; set; }
        public string Function { get; set; }
        
    }
}