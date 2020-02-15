import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  fetchByValue(model, value) {
    return this.http.get(
        this.auth.apiUrl + '/' + model + '/' + value + "/"
    )
  }
  //Gets specific model by defining value(s)

  fetchAll(model) {
    return this.http.get(
        this.auth.apiUrl + '/' + model 
    );
  }
  //Gets all of an item for user

  addItem(model, data){
    return this.http.post(
        this.auth.apiUrl + '/' + model , data
    );
  }
  //Posts new item to API

  updateItem(model, data, value){
    return this.http.put(
        this.auth.apiUrl  + '/' + model + '/' + value, data
    );
  }
  //Updates selected item

  deleteItem(model, value){
    return this.http.delete(
        this.auth.apiUrl  + '/' + model + '/' + value,
        {responseType: 'text'}
    );
  }
  //Deletes selected item

}