import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Schedule } from './schedule.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';
import { EmployeeService } from '../employees/employee.service';
import { DepartmentService } from 'src/app/processes/department/department.service';
import { ObjectiveService } from 'src/app/processes/objective/objective.service';

@Injectable({providedIn: 'root'})
export class ScheduleService {
  scheduleChanged = new Subject();
  scheduleCancel = new Subject();
  employeesForSelection = {};
  departmentsForSelection = {};
  selectedDate: string;
  usingSpecificDate: boolean = false;
  selectedEmployeeId: number;

  constructor(
    private httpServ: HttpService,
    private employeeServ: EmployeeService,
    private departmentServ: DepartmentService,
    private objectiveServ: ObjectiveService,
  ) {}

  fetchSingleSchedule(id: number) {
    return this.httpServ.fetchAll("schedule/" + id)
      .pipe(
        map((responseData: Schedule) => {
          return responseData;
        })
      )
  }
  //Gets single best practice

  fetchSchedule(month: number, year: number, day: number) {
    return this.httpServ.fetchAll("schedule/byUser/" + month + "&" + year + "&" + day)
      .pipe(
        map((responseData: Schedule[]) => {
          return responseData;
        })
      )
  }
  //Gets all employees

  fetchSchedulesByEmployee(employeeId: number, month: number, year: number, day: number) {
    return this.httpServ.fetchAll("schedule/byEmployee/" + employeeId + "&" + month + "&" + year + "&" + day)
      .pipe(
        map((responseData: Schedule[]) => {
          return responseData;
        })
      )
  }
  //Gets all best practices

  addSchedule(data: Schedule){
    return this.httpServ.addItem("schedule", data);
  }
  //Posts new best practice to API

  updateSchedule(data, id: number){
    return this.httpServ.updateItemById("schedule", data, id);
  }
  //Updates purpose for best practice

  deleteSchedule(id: number){
    return this.httpServ.deleteItemById("schedule", id);
  }
  //Deletes selected best practice

  getEmployees(){
    this.employeeServ.fetchEmployees().subscribe(employees =>{
      employees.forEach(employee =>{
        this.employeesForSelection[employee.employeeId] = employee.name;
      });
    })
  }
  // Sets employee values for form employee selection

  getDeparments(){
    this.departmentServ.fetchDepartments().subscribe(departments =>{
      departments.forEach(department =>{
        this.getObjectives(department.deptName);
      })
    })
  }
  // Sets employee values for form employee selection

  getObjectives(department: string){
    let objectivesForReturn = [];
    this.objectiveServ.fetchObjectivesByDepartment(department).subscribe(objectives =>{
      let completionTracker = 0;
      objectives.forEach(objective =>{
        completionTracker++;
        objectivesForReturn.push(objective.objectiveName);
        if (completionTracker == objectives.length){
          this.departmentsForSelection[department] = objectivesForReturn;
        }
      })
    })
  }
  // Sets employee values for form employee selection

}