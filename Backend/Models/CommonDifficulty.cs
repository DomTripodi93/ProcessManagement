namespace Backend.Models
{
    public class CommonDifficulty
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public string StepNumber { get; set; }
        public string ObjectiveName { get; set; }
        public string DeptName { get; set; }
        public string Difficulty { get; set; }
        public string Cause { get; set; }
        public string Solution { get; set; }
        
    }
}