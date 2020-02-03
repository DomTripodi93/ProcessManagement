using AutoMapper;
using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForReturnDto>();
            CreateMap<UserForRegisterDto, User>().ReverseMap();
        }
    }
}