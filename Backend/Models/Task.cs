using System.Collections.Generic;

namespace Backend.Models
{
    public class Task
    {
        public User User { get; set; }
        public int userId { get; set; }
        public string DeptName { get; set; }
        public string TaskName { get; set; }
        public string Goal { get; set; }
        public string Time { get; set; }
        public ICollection<Step> Step { get; set; }
        
    }
}