using System.Collections.Generic;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<Department> Department { get; set; }
        public ICollection<Employee> Employee { get; set; }
    }
}