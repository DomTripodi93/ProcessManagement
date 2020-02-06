using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Data
{
    public class ScheduleRepository : IScheduleRepository
    {

        public Task<Employee> GetEmployee(int userId, int employeeId)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Employee>> GetEmployees(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<Schedule> GetScheduledTask(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Schedule>> GetScheduledTasksForAccount(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Schedule>> GetScheduledTasksForEmployee(int userId, int employeeId)
        {
            throw new System.NotImplementedException();
        }
        
    }
}