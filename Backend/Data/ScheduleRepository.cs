using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Employee> GetEmployee(int userId, int employeeId)
        {
            var employee = await _context.Employees
                .Where(e => e.userId == userId)
                .Where(e => e.EmployeeId == employeeId)
                .FirstOrDefaultAsync();
            
            return employee;
        }

        public async Task<IEnumerable<Employee>> GetEmployees(int userId)
        {
            var employees = await _context.Employees
                .Where(e => e.userId == userId)
                .ToListAsync();

            return employees;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByDepartment(int userId, string deptName)
        {
            var employees = await _context.Employees
                .Where(e => e.userId == userId)
                .Where(e => e.deptName == deptName)
                .ToListAsync();

            return employees;
        }

        public async Task<Schedule> GetScheduledTask(int id)
        {
            var scheduledTask = await _context.Schedules
                .Where(s => s.Id == id)
                .FirstOrDefaultAsync();

            return scheduledTask;
        }

        public async Task<IEnumerable<Schedule>> GetScheduledTasksForAccount(int userId, int Month, int Year)
        {
            var scheduledTasks = await _context.Schedules
                .Where(s => s.userId == userId)
                .ToListAsync();

            return scheduledTasks;
        }

        public async Task<IEnumerable<Schedule>> GetScheduledTasksForEmployee(int userId, int employeeId, int Month, int Year)
        {
            var scheduledTasks = await _context.Schedules
                .Where(s => s.userId == userId)
                .Where(s => s.EmployeeId == employeeId)
                .Where(s => s.Date.Year == Year)
                .Where(s => s.Date.Month == Month)
                .ToListAsync();

            return scheduledTasks;
        }
    }
}