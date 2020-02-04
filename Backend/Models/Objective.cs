using System.Collections.Generic;

namespace Backend.Models
{
    public class Objective
    {
        public User User { get; set; }
        public int userId { get; set; }
        public Department Department { get; set; }
        public string deptName { get; set; }
        public string ObjectiveName { get; set; }
        public string Goal { get; set; }
        public string Time { get; set; }
        public ICollection<Step> Step { get; set; }
        
    }
}