import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { BestPractice } from './best-practice.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BestPracticeService {
  bestPracticeChanged = new Subject();
  bestPracticeCancel = new Subject();

  constructor(
    private httpServ: HttpService
  ) {}

  fetchSingleBestPractice(id: number) {
    return this.httpServ.fetchAll("bestPractice/" + id)
      .pipe(
        map((responseData: BestPractice) => {
          return responseData;
        })
      )
  }
  //Gets single best practice

  fetchBestPracticesByStep(department: string, objective: string, step: string) {
    return this.httpServ.fetchAll("bestPractice/byStep/" + department + "&" + objective + "&" + step)
      .pipe(
        map((responseData: BestPractice[]) => {
          return responseData;
        })
      )
  }
  //Gets all best practices

  addBestPractice(data: BestPractice){
    return this.httpServ.addItem("bestPractice", data);
  }
  //Posts new best practice to API

  updateBestPractice(data, id: number){
    return this.httpServ.updateItemById("bestPractice", data, id);
  }
  //Updates purpose for best practice

  deleteBestPractice(id: number){
    return this.httpServ.deleteItemById("bestPractice", id);
  }
  //Deletes selected best practice

}