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
    public class DepartmentController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProcessRepository _repo;
        private readonly IUserRepository _userRepo;

        public DepartmentController(IMapper mapper, IProcessRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddDepartment(int userId, DepartmentForCreationDto departmentForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var department = _mapper.Map<Department>(departmentForCreation);

            department.User = creator;

            _repo.Add(department);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<DepartmentForCreationDto>(department);
                return CreatedAtRoute("GetDepartment", new {deptName = department.DeptName, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Department failed on save");

        }

        [HttpGet("{deptName}", Name="GetDepartment")]
        public async Task<IActionResult> GetDepartment(int userId, string deptName)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var departmentFromRepo = _repo.GetDepartment(userId, deptName);

            DepartmentForCreationDto departmentForReturn = _mapper.Map<DepartmentForCreationDto>(departmentFromRepo);

            return Ok(departmentForReturn);

        }

        [HttpGet("byUser")]
        public async Task<IActionResult> GetDepartments(int userId)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Department> departmentsFromRepo = await _repo.GetDepartments(userId);

            IEnumerable<DepartmentForCreationDto> departmentForReturn = _mapper.Map<IEnumerable<DepartmentForCreationDto>>(departmentsFromRepo);

            return Ok(departmentForReturn);

        }

        [HttpPut("{deptName}")]
        public async Task<IActionResult> UpdateDepartment(int userId, string deptName, DepartmentForCreationDto departmentForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var departmentFromRepo = await _repo.GetDepartment(userId, deptName);

            _mapper.Map(departmentForUpdateDto, departmentFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetDepartment", new {deptName = departmentFromRepo.DeptName, userId = userId }, departmentForUpdateDto);

            throw new Exception($"Updating department {deptName} failed on save");
        }

        [HttpDelete("{deptName}")]
        public async Task<IActionResult> DeleteDepartment(int userId, string deptName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var departmentFromRepo = await _repo.GetDepartment(userId, deptName);
            
            _repo.Delete(departmentFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Department " + departmentFromRepo.DeptName + " was deleted!");
        
            throw new Exception($"Deleting department {deptName} failed on save");
        }
        
    }
}