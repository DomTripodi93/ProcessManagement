using System.Collections.Generic;

namespace Backend.Models
{
    public class Step
    {
        public User User { get; set; }
        public int userId { get; set; }
        public string TaskName { get; set; }
        public string DeptName { get; set;}
        public int Number { get; set; }
        public string Name { get; set; }
        public string Goal { get; set; }
        public ICollection<BestPractice> BestPractice { get; set; }
        public ICollection<CommonDifficulty> CommonDifficulty { get; set; }
        
    }
}