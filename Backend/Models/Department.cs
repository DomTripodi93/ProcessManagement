using System.Collections.Generic;

namespace Backend.Models
{
    public class Department
    {
        public User User { get; set; }
        public int userId { get; set; }
        public string DeptName { get; set; }
        public string Function { get; set; }
        public ICollection<Objective> Objective { get; set; }
        
    }
}