import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Schedule } from './schedule.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScheduleService {
  scheduleChanged = new Subject();
  scheduleCancel = new Subject();

  constructor(
    private httpServ: HttpService
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

}