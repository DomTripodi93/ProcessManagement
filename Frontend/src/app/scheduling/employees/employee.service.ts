import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Employee } from './employee.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  employeeChanged = new Subject();
  employeeCancel = new Subject();

  constructor(
    private httpServ: HttpService
  ) {}

  fetchSingleEmployee(id) {
    return this.httpServ.fetchById("employee", id)
      .pipe(
        map((responseData: Employee) => {
          return responseData;
        })
      )
  }
  //Gets specific employee by name

  fetchEmployees() {
    return this.httpServ.fetchAll("employee/byUser")
      .pipe(
        map((responseData: Employee[]) => {
          return responseData;
        })
      )
  }
  //Gets all employees

  fetchEmployeesByDepartment(department) {
    return this.httpServ.fetchAll("employee/byDepartment/" + department)
      .pipe(
        map((responseData: Employee[]) => {
          return responseData;
        })
      )
  }
  //Gets all employees for a department

  addEmployee(data: Employee){
    return this.httpServ.addItem("employee", data);
  }
  //Posts new employee to API

  updateEmployee(data, id: number){
    return this.httpServ.updateItemById("employee", data, id);
  }
  //Updates function for employee

  deleteEmployee(id: number){
    return this.httpServ.deleteItemById("employee", id);
  }
  //Deletes selected employee

}