import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class HelperService {

  constructor( ) {}
  
  capitalize(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  slashToDash(string: string){
    return string.split("/").join("-");
  }

  dashToSlash(string: string){
    return string.split("-").join("/");
  }

  gapToDash(string: string){
    return string.split(" ").join("-");
  }

  dashToGap(string: string){
    return string.split("-").join(" ");
  }

  async removeSpaceAtEnd(string: string){
    if (string.charAt(string.length -1) == " "){
        string = string.substring(0, string.length -1);
        string = await this.removeSpaceAtEnd(string);
    }
    
    return string;
  }

  timeFromDate(date: string){
    return date.split("T")[1].substring(0,5)
  }

}