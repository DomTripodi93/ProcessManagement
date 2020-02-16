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

  dateForForm(date: string){
    let dateHold = date.split("-");
    if (dateHold[0].length != 2){
        dateHold[0] = "0" + dateHold[0];
    };
    if (dateHold[1].length != 2){
        dateHold[1] = "0" + dateHold[1];
    };
    date = dateHold[2] + "-" + dateHold[0] + "-" + dateHold[1];
    
    return date;
  }

  dateForDisplay(date: string){
    let dateHold = date.split("-");
    date = dateHold[1] + "-" + dateHold[2] + "-" + dateHold[0];
    
    return date;
  }

}