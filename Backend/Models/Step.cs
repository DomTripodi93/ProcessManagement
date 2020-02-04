using System.Collections.Generic;

namespace Backend.Models
{
    public class Step
    {
        public User User { get; set; }
        public int userId { get; set; }
        public Objective Objective { get; set; }
        public string objectiveName { get; set; }
        public Department Department { get; set; }
        public string deptName { get; set;}
        public string StepNumber { get; set; }
        public string Name { get; set; }
        public string Goal { get; set; }
        public ICollection<BestPractice> BestPractice { get; set; }
        public ICollection<CommonDifficulty> CommonDifficulty { get; set; }
        
    }
}