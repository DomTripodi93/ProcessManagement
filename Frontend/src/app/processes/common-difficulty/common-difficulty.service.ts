import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { CommonDifficulty } from './common-difficulty.model';
import { HttpService } from '../../shared/http.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommonDifficultyService {
  commonDifficultyChanged = new Subject();
  commonDifficultyCancel = new Subject();

  constructor(
    private httpServ: HttpService
  ) {}

  fetchSingleCommonDifficulty(id: number) {
    return this.httpServ.fetchAll("commonDifficulty/" + id)
      .pipe(
        map((responseData: CommonDifficulty) => {
          return responseData;
        })
      )
  }
  //Gets single common difficulty

  fetchCommonDifficultiesByStep(department: string, objective: string, step: string) {
    return this.httpServ.fetchAll("commonDifficulty/byStep/" + department + "&" + objective + "&" + step)
      .pipe(
        map((responseData: CommonDifficulty[]) => {
          return responseData;
        })
      )
  }
  //Gets all common difficulties

  addCommonDifficulty(data: CommonDifficulty){
    return this.httpServ.addItem("commonDifficulty", data);
  }
  //Posts new common difficulty to API

  updateCommonDifficulty(data, id: number){
    return this.httpServ.updateItemById("commonDifficulty", data, id);
  }
  //Updates solution for common difficulty

  deleteCommonDifficulty(id: number){
    return this.httpServ.deleteItemById("commonDifficulty", id);
  }
  //Deletes selected common difficulty

}