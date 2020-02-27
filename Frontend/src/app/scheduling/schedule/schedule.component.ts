import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import _ from 'lodash';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('newMonth') newMonthForm: NgForm;
  date = new Date();
  today = this.date.getDate();
  month = this.date.getMonth();
  monthHold = ""+(this.month+1);
  year = this.date.getFullYear();
  day = this.date.getDay();
  defaultMonth = ""; 
  oldMonth: number = this.month;
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  numberOfDays: number;
  monthDays = []
  firstDayOfMonth = []
  firstDay: Date;

  constructor() { }

  ngOnInit() {
    this.initializeMonth();
  }

  initializeMonth(){
    if (this.month < 10){
      this.monthHold ="0"+this.monthHold;
    }
    this.defaultMonth = this.year +"-"+ this.monthHold;
    this.setDate();
  }

  setDate(){
    this.numberOfDays = this.daysInMonth(this.year, this.month+1);
    this.monthDays = _.range(1, this.numberOfDays + 1);
    this.firstDay = new Date(this.year, this.month, 1);
    this.firstDayOfMonth = _.range(0, this.firstDay.getDay());
  }

  daysInMonth(year: number, month: number){
    return new Date(year, month, 0).getDate();
  }

  changeDate(){
    let hold = this.newMonthForm.value.date.split("-")
    this.year = +hold[0];
    this.month = +hold[1] - 1;
    this.setDate();
  }
}
