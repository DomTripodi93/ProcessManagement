using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Data
{
    public interface IScheduleRepository
    {
        Task<Employee> GetEmployee(int userId, int employeeId);
        Task<IEnumerable<Employee>> GetEmployees(int userId);
        Task<Schedule> GetScheduledTask(int id);
        Task<IEnumerable<Schedule>> GetScheduledTasksForEmployee(int userId, int employeeId);
        Task<IEnumerable<Schedule>> GetScheduledTasksForAccount(int userId);
         
    }
}