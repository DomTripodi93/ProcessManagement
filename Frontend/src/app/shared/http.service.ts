import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { HelperService } from './helper.service';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private helpers: HelperService
  ) {}

  fetchByValue(model: string, value: string) {
    value = this.helpers.slashToDash(value);
    return this.http.get(
        this.auth.apiUrl + '/' + model + '/' + value
    )
  }
  //Gets specific model by defining value(s)

  fetchById(model: string, id: number) {
    return this.http.get(
        this.auth.apiUrl + '/' + model + '/' + id
    )
  }
  //Gets specific model by id

  fetchAll(model: string) {
    return this.http.get(
        this.auth.apiUrl + '/' + model 
    );
  }
  //Gets all of an item for user

  addItem(model: string, data: any){
    return this.http.post(
        this.auth.apiUrl + '/' + model , data
    );
  }
  //Posts new item to API

  updateItem(model: string, data: any, value: string){
    value = this.helpers.slashToDash(value);
    return this.http.put(
        this.auth.apiUrl  + '/' + model + '/' + value, data
    );
  }
  //Updates selected item

  updateItemById(model: string, data: any, id: number){
    return this.http.put(
        this.auth.apiUrl  + '/' + model + '/' + id, data
    );
  }
  //Updates selected item

  deleteItem(model: string, value: string){
    value = this.helpers.slashToDash(value);
    return this.http.delete(
        this.auth.apiUrl  + '/' + model + '/' + value,
        {responseType: 'text'}
    );
  }
  //Deletes selected item

  deleteItemById(model: string, id: number){
    return this.http.delete(
        this.auth.apiUrl  + '/' + model + '/' + id,
        {responseType: 'text'}
    );
  }
  //Deletes selected item by id

}