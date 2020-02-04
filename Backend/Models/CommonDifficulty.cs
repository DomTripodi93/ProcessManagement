namespace Backend.Models
{
    public class CommonDifficulty
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public Step Step { get; set; }
        public string Cause { get; set; }
        public string Solution { get; set; }
        
    }
}