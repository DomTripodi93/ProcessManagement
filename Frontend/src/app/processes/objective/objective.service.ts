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

  fetchObjectiveByName(name) {
    return this.httpServ.fetchByValue("objective", name)
      .pipe(
        map((responseData: Objective) => {
          return responseData;
        })
      )
  }
  //Gets specific objective by name

  fetchObjectives() {
    return this.httpServ.fetchAll("objective/byUser")
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

  updateObjective(data, name){
    return this.httpServ.updateItem("objective", data, name);
  }
  //Updates function for objective

  deleteObjective(name){
    return this.httpServ.deleteItem("objective", name);
  }
  //Deletes selected objective

}