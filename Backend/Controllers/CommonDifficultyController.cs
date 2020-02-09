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
    public class CommonDifficultyController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProcessRepository _repo;
        private readonly IUserRepository _userRepo;

        public CommonDifficultyController(IMapper mapper, IProcessRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddCommonDifficulty(int userId, CommonDifficultyForCreationDto commonDifficultyForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var commonDifficulty = _mapper.Map<CommonDifficulty>(commonDifficultyForCreation);

            commonDifficulty.User = creator;

            _repo.Add(commonDifficulty);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<CommonDifficultyForReturnDto>(commonDifficulty);
                return CreatedAtRoute("GetCommonDifficulty", new {id = commonDifficulty.Id, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Best Practice failed on save");

        }

        [HttpGet("{id}", Name="GetCommonDifficulty")]
        public async Task<IActionResult> GetCommonDifficulty(int userId, int id)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var commonDifficultyFromRepo = _repo.GetCommonDifficulty(id);

            CommonDifficultyForReturnDto commonDifficultyForReturn = _mapper.Map<CommonDifficultyForReturnDto>(commonDifficultyFromRepo);

            return Ok(commonDifficultyForReturn);

        }

        [HttpGet("byStep/{department}/{objective}/{step}")]
        public async Task<IActionResult> GetCommonDifficulties(int userId, string department, string objective, string step)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<CommonDifficulty> commonDifficultysFromRepo = await _repo.GetCommonDifficulties(userId, department, objective, step);

            IEnumerable<CommonDifficultyForReturnDto> commonDifficultyForReturn = _mapper.Map<IEnumerable<CommonDifficultyForReturnDto>>(commonDifficultysFromRepo);

            return Ok(commonDifficultyForReturn);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommonDifficulty(int userId, int id, CommonDifficultyForCreationDto commonDifficultyForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var commonDifficultyFromRepo = await _repo.GetCommonDifficulty(id);

            _mapper.Map(commonDifficultyForUpdateDto, commonDifficultyFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetProd", new {id = commonDifficultyFromRepo.Id, userId = userId }, commonDifficultyForUpdateDto);

            throw new Exception($"Updating best practice {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommonDifficulty(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var commonDifficultyFromRepo = await _repo.GetCommonDifficulty(id);
            
            _repo.Delete(commonDifficultyFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Best practice " + commonDifficultyFromRepo.Id + " was deleted!");
        
            throw new Exception($"Deleting best practice {id} failed on save");
        }
        
    }
}