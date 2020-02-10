using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Models;

namespace Backend.Data
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public ScheduleRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public Task<Employee> GetEmployee(int userId, int employeeId)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Employee>> GetEmployees(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Employee>> GetEmployeesByDepartment(int userId, string deptName)
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