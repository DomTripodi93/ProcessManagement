import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Department } from './department.model';
import { HttpService } from '../shared/http.service';

@Injectable({providedIn: 'root'})
export class DepartmentService {

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

}