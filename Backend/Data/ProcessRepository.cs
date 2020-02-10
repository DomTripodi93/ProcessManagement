using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ProcessRepository : IProcessRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public ProcessRepository(DataContext context, IMapper mapper)
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

        public async Task<Department> GetDepartment(int userId, string deptName)
        {
            var department = await _context.Departments
                .Where(d => d.userId == userId)
                .Where(d => d.DeptName == deptName)
                .FirstOrDefaultAsync();
            
            return department;
        }

        public async Task<IEnumerable<Department>> GetDepartments(int userId)
        {
            var departments = await _context.Departments
                .Where(d => d.userId == userId)
                .ToListAsync();
            
            return departments;
        }

        public async Task<Objective> GetObjective(int userId, string deptName, string objectiveName)
        {
            var objective = await _context.Objectives
                .Where(o => o.userId == userId)
                .Where(o => o.ObjectiveName == objectiveName)
                .Where(o => o.deptName == deptName)
                .FirstOrDefaultAsync();

            return objective;
        }

        public async Task<IEnumerable<Objective>> GetObjectivesByDepartment(int userId, string deptName)
        {
            var objectives = await _context.Objectives
                .Where(o => o.userId == userId)
                .Where(o => o.deptName == deptName)
                .ToListAsync();

            return objectives;
        }

        public async Task<Step> GetStep(int userId, string deptName, string objectiveName, string stepNumber)
        {
            var step = await _context.Steps
                .Where(s => s.userId == userId)
                .Where(s => s.StepNumber == stepNumber)
                .Where(s => s.objectiveName == objectiveName)
                .Where(s => s.deptName == deptName)
                .FirstOrDefaultAsync();

            return step;
        }

        public async Task<IEnumerable<Step>> GetSteps(int userId, string deptName, string objectiveName)
        {
            var steps = await _context.Steps
                .Where(s => s.userId == userId)
                .Where(s => s.objectiveName == objectiveName)
                .Where(s => s.deptName == deptName)
                .ToListAsync();

            return steps;
        }

        public async Task<BestPractice> GetBestPractice(int id)
        {
            var bestPractice = await _context.BestPractices
                .Where(bp => bp.Id == id)
                .FirstOrDefaultAsync();
            
            return bestPractice;
        }

        public async Task<IEnumerable<BestPractice>> GetBestPractices(int userId, string deptName, string objectiveName, string stepNumber)
        {
            var bestPractices = await _context.BestPractices
                .Where(bp => bp.userId == userId)
                .Where(bp => bp.DeptName == deptName)
                .Where(bp => bp.ObjectiveName == objectiveName)
                .Where(bp => bp.StepNumber == stepNumber)
                .ToListAsync();

            return bestPractices;
        }

        public async Task<CommonDifficulty> GetCommonDifficulty(int id)
        {
            var commonDifficulty = await _context.CommonDifficulties
                .Where(cd => cd.Id == id)
                .FirstOrDefaultAsync();
            
            return commonDifficulty;
        }
        
        public async Task<IEnumerable<CommonDifficulty>> GetCommonDifficulties(int userId, string deptName, string objectiveName, string stepNumber)
        {
            var commonDifficultys = await _context.CommonDifficulties
                .Where(cd => cd.userId == userId)
                .Where(cd => cd.DeptName == deptName)
                .Where(cd => cd.ObjectiveName == objectiveName)
                .Where(cd => cd.StepNumber == stepNumber)
                .ToListAsync();

            return commonDifficultys;
        }
        
    }
}