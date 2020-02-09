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
    public class BestPracticeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProcessRepository _repo;
        private readonly IUserRepository _userRepo;

        public BestPracticeController(IMapper mapper, IProcessRepository repo, IUserRepository userRepo){
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddBestPractice(int userId, BestPracticeForCreationDto bestPracticeForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bestPractice = _mapper.Map<BestPractice>(bestPracticeForCreation);

            bestPractice.User = creator;

            _repo.Add(bestPractice);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<BestPracticeForReturnDto>(bestPractice);
                return CreatedAtRoute("GetBestPractice", new {id = bestPractice.Id, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Best Practice failed on save");

        }

        [HttpGet("{id}", Name="GetBestPractice")]
        public async Task<IActionResult> GetBestPractice(int userId, int id)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bestPracticeFromRepo = _repo.GetBestPractice(id);

            BestPracticeForReturnDto bestPracticeForReturn = _mapper.Map<BestPracticeForReturnDto>(bestPracticeFromRepo);

            return Ok(bestPracticeForReturn);

        }

        [HttpGet("byStep/{department}/{objective}/{step}")]
        public async Task<IActionResult> GetBestPractices(int userId, string department, string objective, string step)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<BestPractice> bestPracticesFromRepo = await _repo.GetBestPractices(userId, department, objective, step);

            IEnumerable<BestPracticeForReturnDto> bestPracticeForReturn = _mapper.Map<IEnumerable<BestPracticeForReturnDto>>(bestPracticesFromRepo);

            return Ok(bestPracticeForReturn);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBestPractice(int userId, int id, BestPracticeForCreationDto bestPracticeForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bestPracticeFromRepo = await _repo.GetBestPractice(id);

            _mapper.Map(bestPracticeForUpdateDto, bestPracticeFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetProd", new {id = bestPracticeFromRepo.Id, userId = userId }, bestPracticeForUpdateDto);

            throw new Exception($"Updating best practice {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduction(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var bestPracticeFromRepo = await _repo.GetBestPractice(id);
            
            _repo.Delete(bestPracticeFromRepo);
            await _repo.SaveAll();
            return Ok(
                        "Best practice "
                        + bestPracticeFromRepo.Id
                        + " was deleted!"
                    );
        }
        
    }
}