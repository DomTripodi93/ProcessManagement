using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base (options) {}
        public DbSet<BestPractice> BestPractices { get; set; }
        public DbSet<CommonDifficulty> CommonDifficulties { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasKey(d => new {d.userId, d.DeptName});
            modelBuilder.Entity<Employee>()
                .HasKey(e => new {e.userId, e.Id});
            modelBuilder.Entity<Step>()
                .HasKey(s => new {s.userId, s.TaskName, s.Number});
            modelBuilder.Entity<Task>()
                .HasKey(t => new {t.userId, t.DeptName, t.TaskName});
        }
    }
}