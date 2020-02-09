namespace Backend.Models
{
    public class CommonDifficulty
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public string stepNumber { get; set; }
        public string objectiveName { get; set; }
        public string Cause { get; set; }
        public string Solution { get; set; }
        
    }
}