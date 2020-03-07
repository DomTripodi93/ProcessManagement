import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { User } from '../register/user.model';
import { Signin } from '../register/signin/signin.model';

@Injectable({providedIn:'root'})
export class AuthService {
  token = '';
  user = '';
  name = '';
  isAuthenticated = true;
  authApiUrl = 'http://localhost:5000/api';
  apiUrl = 'http://localhost:5000/api/' + localStorage.getItem('id');
  authChanged = new Subject();

  constructor(
      private http: HttpClient
  ){}
  
  logout(){
    this.user = '';
    this.token = '';
    this.name = '';
    this.isAuthenticated = false;
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    localStorage.setItem('name', '');
    this.apiUrl = this.authApiUrl + "/" + this.user;
  };
  //Resets all related values from Login to their initial values, and activated authentication 
  // observable subscription actions

  registerUser(data: User){
    return this.http.post(
      this.authApiUrl + '/auth/register',
      data
    );
  };
  //Posts User Creation Data to registration end-point

  signinUser(data: Signin){
    return this.http.post(
      this.authApiUrl + '/auth/login',
      data,
      {
        observe: 'response'
      }
    );
  };
  //Sends Email and Password to backend to return User Token, and Id for Future API Calls

  getUserDetails(){
    return this.http.get(
      this.authApiUrl + "/user/" + this.user
    );
  };
  //Sends API Call with Token and User ID to verify User and Set Authenticated Value to true 
  // from App Component


}