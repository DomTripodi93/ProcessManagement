namespace Backend.Dtos
{
    public class EmployeeForUpdateDto
    {
        public string Department { get; set; }
        public string Name { get; set; }
        public bool CanEdit { get; set; }
        
    }
}