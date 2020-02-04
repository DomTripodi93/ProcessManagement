using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Models;

namespace Backend.Data
{
    public interface IUserRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        
    }
}