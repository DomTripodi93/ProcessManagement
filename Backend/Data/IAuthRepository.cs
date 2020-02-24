using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         void InitializeEmployeeIdForIncrement(int userId);
         Task<User> Login(string email, string password);
         Task<bool> UserExists(string email);
    }
}