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
        public DbSet<Objective> Objectives { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .HasKey(d => new {d.userId, d.DeptName});
            modelBuilder.Entity<Employee>()
                .HasKey(e => new {e.userId, e.EmployeeId});
            modelBuilder.Entity<Step>()
                .HasKey(s => new {s.userId, s.deptName, s.objectiveName, s.StepNumber});
            modelBuilder.Entity<Objective>()
                .HasKey(t => new {t.userId, t.deptName, t.ObjectiveName});
        }
    }
}