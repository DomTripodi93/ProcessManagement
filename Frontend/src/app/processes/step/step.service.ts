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

  fetchSingleStep(department: string, objective: string, step: string) {
    return this.httpServ.fetchAll("step/" + department + "&" + objective + "&" + step)
      .pipe(
        map((responseData: Step) => {
          return responseData;
        })
      )
  }
  //Gets single step

  fetchStepsByObjective(department: string, objective: string) {
    return this.httpServ.fetchAll("step/byObjective/" + department + "&" + objective)
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

  updateStep(data, department: string, objective: string, step: string){
    return this.httpServ.updateItem("step", data, department + "&" + objective + "&" + step);
  }
  //Updates goal for step

  deleteStep(department: string, objective: string, step: string){
    return this.httpServ.deleteItem("step", department + "&" + objective + "&" + step);
  }
  //Deletes selected step

}