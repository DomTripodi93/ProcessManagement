import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class HelperService {

  constructor( ) {}
  
  capitalize(string: string){
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

}