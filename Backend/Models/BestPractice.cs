namespace Backend.Models
{
    public class BestPractice
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public string StepNumber { get; set; }
        public string ObjectiveName { get; set; }
        public string DeptName { get; set; }
        public string Practice { get; set; }
        public string Method { get; set; }
        public string Purpose { get; set; }
        
    }
}