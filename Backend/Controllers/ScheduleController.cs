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
    public class ScheduleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IScheduleRepository _repo;
        private readonly IUserRepository _userRepo;

        public ScheduleController(IMapper mapper, IScheduleRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddSchedule(int userId, ScheduleForCreationDto scheduleForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var schedule = _mapper.Map<Schedule>(scheduleForCreation);

            schedule.User = creator;

            _repo.Add(schedule);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<ScheduleForCreationDto>(schedule);
                return CreatedAtRoute("GetScheduledTask", new {Id = schedule.Id, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Schedule item failed on save");

        }

        [HttpGet("{Id}", Name="GetScheduledTask")]
        public async Task<IActionResult> GetScheduledTask(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var scheduleFromRepo = await _repo.GetScheduledTask(Id);

            ScheduleForReturnDto scheduleForReturn = _mapper.Map<ScheduleForReturnDto>(scheduleFromRepo);

            return Ok(scheduleForReturn);

        }

        [HttpGet("byUser/{Month}&{Year}&{Day}")]
        public async Task<IActionResult> GetScheduledTasks(int userId, int Month, int Year, int Day)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Schedule> schedulesFromRepo = await _repo.GetScheduledTasksForAccountDay(userId, Month, Year, Day);

            IEnumerable<ScheduleForReturnDto> scheduleForReturn = _mapper.Map<IEnumerable<ScheduleForReturnDto>>(schedulesFromRepo);

            return Ok(scheduleForReturn);

        }

        [HttpGet("byEmployee/{employeeId}&{Month}&{Year}&{Day}")]
        public async Task<IActionResult> GetScheduledTasksByEmployee(int userId, int employeeId, int Month, int Year, int Day)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Schedule> schedulesFromRepo = await _repo.GetScheduledTasksForEmployeeDay(userId, employeeId, Month, Year, Day);

            IEnumerable<ScheduleForReturnDto> schedulesForReturn = _mapper.Map<IEnumerable<ScheduleForReturnDto>>(schedulesFromRepo);

            return Ok(schedulesForReturn);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateSchedule(int userId, int Id, ScheduleForCreationDto scheduleForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var scheduleFromRepo = await _repo.GetScheduledTask(Id);

            _mapper.Map(scheduleForUpdateDto, scheduleFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetScheduledTask", new {Id = scheduleFromRepo.Id, userId = userId }, scheduleForUpdateDto);

            throw new Exception($"Updating schedule item {Id} failed on save");
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteSchedule(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var scheduleFromRepo = await _repo.GetScheduledTask(Id);
            
            _repo.Delete(scheduleFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Schedule item " + scheduleFromRepo.Id + " was deleted!");
        
            throw new Exception($"Deleting schedule {Id} failed on save");
        }
    }
}