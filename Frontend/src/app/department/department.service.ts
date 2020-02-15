import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Department } from './department.model';
import { HttpService } from '../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DepartmentService {
  deptChanged = new Subject();
  deptCancel = new Subject();

  constructor(
    private httpServ: HttpService
  ) {}

  fetchDepartmentByName(name) {
    return this.httpServ.fetchByValue("department", name)
      .pipe(
        map((responseData: Department) => {
          return responseData;
        })
      )
  }
  //Gets specific department by name

  fetchDepartments() {
    return this.httpServ.fetchAll("department")
      .pipe(
        map((responseData: Department[]) => {
          return responseData;
        })
      )
  }
  //Gets all departments

  addDepartment(data: Department){
    return this.httpServ.addItem("department", data);
  }
  //Posts new department to API

  updateDepartment(data, name){
    return this.httpServ.updateItem("department", data, name);
  }
  //Updates function for department

  deleteDepartment(name){
    return this.httpServ.deleteItem("department", name);
  }
  //Deletes selected department

}