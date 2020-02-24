using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IScheduleRepository _repo;
        private readonly IUserRepository _userRepo;

        public EmployeeController(IMapper mapper, IScheduleRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(int userId, EmployeeForCreationDto employeeForCreation)
        {
            EmployeeIdIncrement employeeIdIncrement = await _repo.GetEmployeeIdForIncrement(userId);
            employeeIdIncrement.employeeId = employeeIdIncrement.employeeId + 1;

            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employee = _mapper.Map<Employee>(employeeForCreation);

            employee.User = creator;

            employee.EmployeeId = employeeIdIncrement.employeeId;

            _repo.Add(employee);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<EmployeeForCreationDto>(employee);
                return CreatedAtRoute("GetEmployee", new {employeeId = employee.EmployeeId, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Employee failed on save");

        }

        [HttpGet("{employeeId}", Name="GetEmployee")]
        public async Task<IActionResult> GetEmployee(int userId, int employeeId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employeeFromRepo = await _repo.GetEmployee(userId, employeeId);

            EmployeeForCreationDto employeeForReturn = _mapper.Map<EmployeeForCreationDto>(employeeFromRepo);

            return Ok(employeeForReturn);

        }

        [HttpGet("byUser")]
        public async Task<IActionResult> GetEmployees(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Employee> employeesFromRepo = await _repo.GetEmployees(userId);

            IEnumerable<EmployeeForCreationDto> employeeForReturn = _mapper.Map<IEnumerable<EmployeeForCreationDto>>(employeesFromRepo);

            return Ok(employeeForReturn);

        }

        [HttpGet("byDepartment/{deptName}")]
        public async Task<IActionResult> GetEmployeesByDepartment(int userId, string deptName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Employee> employeesFromRepo = await _repo.GetEmployeesByDepartment(userId, deptName);

            IEnumerable<EmployeeForCreationDto> employeesForReturn = _mapper.Map<IEnumerable<EmployeeForCreationDto>>(employeesFromRepo);

            return Ok(employeesForReturn);

        }

        [HttpPut("{employeeId}")]
        public async Task<IActionResult> UpdateEmployee(int userId, int employeeId, EmployeeForUpdateDto employeeForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employeeFromRepo = await _repo.GetEmployee(userId, employeeId);

            _mapper.Map(employeeForUpdateDto, employeeFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetEmployee", new {employeeId = employeeFromRepo.EmployeeId, userId = userId }, employeeForUpdateDto);

            throw new Exception($"Updating employee {employeeId} failed on save");
        }

        [HttpDelete("{employeeId}")]
        public async Task<IActionResult> DeleteEmployee(int userId, int employeeId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var employeeFromRepo = await _repo.GetEmployee(userId, employeeId);
            
            _repo.Delete(employeeFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Employee " + employeeFromRepo.EmployeeId + " was deleted!");
        
            throw new Exception($"Deleting employee {employeeId} failed on save");
        }
    }
}