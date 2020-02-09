namespace Backend.Dtos
{
    public class EmployeeForReturnDto
    {
        public int EmployeeId { get; set; }
        public string deptName { get; set; }
        public string Name { get; set; }
        public bool CanEdit { get; set; }
        
    }
}