using System.Collections.Generic;
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

        public Task<Department> GetDepartment(int userId, string deptName)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Department>> GetDepartments(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<Objective> GetObjective(int userId, string deptName, string objectiveName)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Objective>> GetObjectivesByDepartment(int userId, string deptName)
        {
            throw new System.NotImplementedException();
        }

        public Task<Step> GetStep(int userId, string deptName, string objectiveName, string stepNumber)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Step>> GetSteps(int userId, string deptName, string objectiveName)
        {
            throw new System.NotImplementedException();
        }

        public Task<BestPractice> GetBestPractice(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<BestPractice>> GetBestPractices(int userId, string deptName, string objectiveName, string stepNumber)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<CommonDifficulty>> GetCommonDifficulties(int userId, string deptName, string objectiveName, string stepNumber)
        {
            throw new System.NotImplementedException();
        }

        public Task<CommonDifficulty> GetCommonDifficulty(int id)
        {
            throw new System.NotImplementedException();
        }
        
    }
}