using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForReturnDto>();
            CreateMap<StepForCreationDto, Step>().ReverseMap();
            CreateMap<StepForUpdateDto, Step>().ReverseMap();
            CreateMap<Step, StepForReturnDto>();
            CreateMap<ScheduleForCreationDto, Schedule>().ReverseMap();
            CreateMap<Schedule, ScheduleForCreationDto>();
            CreateMap<ObjectiveForCreationDto, Objective>().ReverseMap();
            CreateMap<ObjectiveForUpdateDto, Objective>().ReverseMap();
            CreateMap<Objective, ObjectiveForReturnDto>();
            CreateMap<EmployeeForCreationDto, Employee>().ReverseMap();
            CreateMap<EmployeeForUpdateDto, Employee>().ReverseMap();
            CreateMap<Employee, EmployeeForReturnDto>();
            CreateMap<DepartmentForCreationDto, Department>().ReverseMap();
            CreateMap<DepartmentForUpdateDto, Department>().ReverseMap();
            CreateMap<Department, DepartmentForCreationDto>();
            CreateMap<CommonDifficultyForCreationDto, CommonDifficulty>().ReverseMap();
            CreateMap<CommonDifficulty, CommonDifficultyForReturnDto>();
            CreateMap<BestPracticeForCreationDto, BestPractice>().ReverseMap();
            CreateMap<BestPractice, BestPracticeForReturnDto>();
        }
    }
}