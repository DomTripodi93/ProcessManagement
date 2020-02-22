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
    public class StepController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProcessRepository _repo;
        private readonly IUserRepository _userRepo;

        public StepController(IMapper mapper, IProcessRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddStep(int userId, StepForCreationDto stepForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var step = _mapper.Map<Step>(stepForCreation);

            step.User = creator;

            _repo.Add(step);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<StepForCreationDto>(step);
                return CreatedAtRoute("GetStep", new {stepNumber = step.StepNumber, deptName = step.deptName, objectiveName = step.objectiveName, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Step failed on save");

        }

        [HttpGet("{deptName}&{objectiveName}&{stepNumber}", Name="GetStep")]
        public async Task<IActionResult> GetStep(int userId, string deptName, string objectiveName, string stepNumber)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var stepFromRepo = await _repo.GetStep(userId, deptName, objectiveName, stepNumber);

            StepForCreationDto stepForReturn = _mapper.Map<StepForCreationDto>(stepFromRepo);

            return Ok(stepForReturn);

        }

        [HttpGet("byObjective/{deptName}&{objectiveName}")]
        public async Task<IActionResult> GetStepsByDepartment(int userId, string deptName, string objectiveName)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Step> stepsFromRepo = await _repo.GetSteps(userId, deptName, objectiveName);

            IEnumerable<StepForCreationDto> stepsForReturn = _mapper.Map<IEnumerable<StepForCreationDto>>(stepsFromRepo);

            return Ok(stepsForReturn);

        }

        [HttpPut("{deptName}&{objectiveName}&{stepNumber}")]
        public async Task<IActionResult> UpdateStep(int userId, string deptName, string objectiveName, string stepNumber, StepForUpdateDto stepForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var stepFromRepo = await _repo.GetStep(userId, deptName, objectiveName, stepNumber);

            _mapper.Map(stepForUpdateDto, stepFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetStep", new {stepNumber = stepFromRepo.StepNumber, deptName = stepFromRepo.deptName, objectiveName = stepFromRepo.objectiveName, userId = userId }, stepForUpdateDto);

            throw new Exception($"Updating step {stepNumber}&{deptName} failed on save");
        }

        [HttpDelete("{deptName}&{objectiveName}&{stepNumber}")]
        public async Task<IActionResult> DeleteStep(int userId, string deptName, string objectiveName, string stepNumber)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var stepFromRepo = await _repo.GetStep(userId, deptName, objectiveName, stepNumber);
            
            _repo.Delete(stepFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Step " + stepFromRepo.StepNumber + " was deleted!");
        
            throw new Exception($"Deleting step {stepNumber}&{deptName} failed on save");
        }
    }
}