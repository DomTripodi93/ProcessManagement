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
    public class ObjectiveController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProcessRepository _repo;
        private readonly IUserRepository _userRepo;

        public ObjectiveController(IMapper mapper, IProcessRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddObjective(int userId, ObjectiveForCreationDto objectiveForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var objective = _mapper.Map<Objective>(objectiveForCreation);

            objective.User = creator;

            _repo.Add(objective);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<ObjectiveForCreationDto>(objective);
                return CreatedAtRoute("GetObjective", new {objectiveName = objective.ObjectiveName, deptName = objective.deptName, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Objective failed on save");

        }

        [HttpGet("{deptName}&{objectiveName}", Name="GetObjective")]
        public async Task<IActionResult> GetObjective(int userId, string deptName, string objectiveName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var objectiveFromRepo = await _repo.GetObjective(userId, deptName, objectiveName);

            ObjectiveForCreationDto objectiveForReturn = _mapper.Map<ObjectiveForCreationDto>(objectiveFromRepo);

            return Ok(objectiveForReturn);

        }

        [HttpGet("byDepartment/{deptName}")]
        public async Task<IActionResult> GetObjectivesByDepartment(int userId, string deptName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Objective> objectivesFromRepo = await _repo.GetObjectivesByDepartment(userId, deptName);

            IEnumerable<ObjectiveForCreationDto> objectivesForReturn = _mapper.Map<IEnumerable<ObjectiveForCreationDto>>(objectivesFromRepo);

            return Ok(objectivesForReturn);

        }

        [HttpPut("{deptName}&{objectiveName}")]
        public async Task<IActionResult> UpdateObjective(int userId, string deptName, string objectiveName, ObjectiveForUpdateDto objectiveForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var objectiveFromRepo = await _repo.GetObjective(userId, deptName, objectiveName);

            _mapper.Map(objectiveForUpdateDto, objectiveFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetObjective", new {objectiveName = objectiveFromRepo.ObjectiveName, deptName = objectiveFromRepo.deptName, userId = userId }, objectiveForUpdateDto);

            throw new Exception($"Updating objective {objectiveName}&{deptName} failed on save");
        }

        [HttpDelete("{deptName}&{objectiveName}")]
        public async Task<IActionResult> DeleteObjective(int userId, string deptName, string objectiveName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var objectiveFromRepo = await _repo.GetObjective(userId, deptName, objectiveName);
            
            _repo.Delete(objectiveFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Objective " + objectiveFromRepo.ObjectiveName + " was deleted!");
        
            throw new Exception($"Deleting objective {objectiveName}&{deptName} failed on save");
        }
        
    }
}