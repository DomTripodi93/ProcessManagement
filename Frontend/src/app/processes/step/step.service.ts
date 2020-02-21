import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Step } from './step.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StepService {
  stepChanged = new Subject();
  stepCancel = new Subject();

  constructor(
    private httpServ: HttpService
  ) {}

  fetchStepByName(name) {
    return this.httpServ.fetchByValue("step", name)
      .pipe(
        map((responseData: Step) => {
          return responseData;
        })
      )
  }
  //Gets specific step by name

  fetchStepsByObjective(department: string, objective: string) {
    return this.httpServ.fetchAll("step/byObjective/" + department + "&" + objective)
      .pipe(
        map((responseData: Step[]) => {
          return responseData;
        })
      )
  }
  //Gets all steps

  fetchSingleStep(department: string, objective: string, step: string) {
    return this.httpServ.fetchAll("step/byObjective/" + department + "&" + objective + "&" + step)
      .pipe(
        map((responseData: Step[]) => {
          return responseData;
        })
      )
  }
  //Gets all steps

  addStep(data: Step){
    return this.httpServ.addItem("step", data);
  }
  //Posts new step to API

  updateStep(data, name){
    return this.httpServ.updateItem("step", data, name);
  }
  //Updates goal for step

  deleteStep(name){
    return this.httpServ.deleteItem("step", name);
  }
  //Deletes selected step

}