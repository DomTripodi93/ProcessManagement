using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Data
{
    public interface IScheduleRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<Employee> GetEmployee(int userId, int employeeId);
        Task<EmployeeIdIncrement> GetEmployeeIdForIncrement(int userId);
        Task<IEnumerable<Employee>> GetEmployees(int userId);
        Task<IEnumerable<Employee>> GetEmployeesByDepartment(int userId, string deptName);
        Task<Schedule> GetScheduledTask(int id);
        Task<IEnumerable<Schedule>> GetScheduledTasksForAccount(int userId, int Month, int Year);
        Task<IEnumerable<Schedule>> GetScheduledTasksForEmployee(int userId, int employeeId, int Month, int Year);
    }
}