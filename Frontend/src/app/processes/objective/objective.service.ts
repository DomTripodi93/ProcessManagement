import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Objective } from './objective.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ObjectiveService {
  objectiveChanged = new Subject();
  objectiveCancel = new Subject();

  constructor(
    private httpServ: HttpService
  ) {}

  fetchSingleObjective(department: string, objective: string) {
    return this.httpServ.fetchByValue("objective", department + "&" + objective)
      .pipe(
        map((responseData: Objective) => {
          return responseData;
        })
      )
  }
  //Gets specific objective by department and name

  fetchObjectivesByDepartment(department: string) {
    return this.httpServ.fetchAll("objective/byDepartment/" + department)
      .pipe(
        map((responseData: Objective[]) => {
          return responseData;
        })
      )
  }
  //Gets all objectives

  addObjective(data: Objective){
    return this.httpServ.addItem("objective", data);
  }
  //Posts new objective to API

  updateObjective(data, department: string, objective: string){
    return this.httpServ.updateItem("objective", data, department + "&" + objective);
  }
  //Updates goal for objective

  deleteObjective(department: string, objective: string){
    return this.httpServ.deleteItem("objective", department + "&" + objective);
  }
  //Deletes selected objective

}