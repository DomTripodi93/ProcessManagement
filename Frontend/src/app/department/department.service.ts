import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';

@Injectable({providedIn: 'root'})
export class DepartmentService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  fetchDepartmentByName(name) {
      return this.http.get(
        this.auth.apiUrl + '/department/' + name + "/"
      )
      .pipe(
        map((responseData: Department) => {
        return responseData;
        })
      )
  }
  //Gets specific department by name

  fetchDepartments() {
      return this.http.get(
        this.auth.apiUrl + '/department'
      )
      .pipe(
        map((responseData: Department[]) => {
            return responseData;
        })
      )
  }
  //Gets departments of specific type (lathe/mill) based on current param value, 
  // or input value for tutorial checks

  addDepartment(data: Department){
      return this.http.post(
        this.auth.apiUrl + '/department/', data
      );
  }
  //Posts new department to API

  updateDepartment(data, name){
      return this.http.put(
        this.auth.apiUrl + '/department/' + name, data
      );
  }
  //Updates currentJob and currentOp valued for department

  deleteDepartment(name){
    return this.http.delete(this.auth.apiUrl + "/department/" + name + "/")
  }
  //Deletes selected department

}