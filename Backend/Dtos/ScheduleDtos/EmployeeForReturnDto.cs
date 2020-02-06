namespace Backend.Dtos
{
    public class EmployeeForReturnDto
    {
        public int EmployeeId { get; set; }
        public string Department { get; set; }
        public string Name { get; set; }
        public bool CanEdit { get; set; }
        
    }
}