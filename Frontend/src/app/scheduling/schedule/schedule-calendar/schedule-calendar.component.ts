import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import _ from 'lodash';
import { Subscription } from 'rxjs';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.css']
})
export class ScheduleCalendarComponent implements OnInit, OnDestroy {
  @ViewChild('newMonth') newMonthForm: NgForm;
  subscriptions: Subscription[] = [];
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
  ];
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
  monthDays = [];
  firstDayOfMonth = [];

  constructor(
    private scheduleServ: ScheduleService
  ) { }

  ngOnInit() {
    this.initializeMonth();
  }

  getEmployeesAndDepartmentsForForm(){
    this.scheduleServ.getEmployees();
    this.scheduleServ.getDeparments();
  }
  //stores values for all employees departments and related objectives for quick 
  // lookup in scheduled task creation form

  initializeMonth(){
    if (this.month < 10){
      this.monthHold ="0"+this.monthHold;
    }
    this.defaultMonth = this.year +"-"+ this.monthHold;
    this.setDate();
  }
  //Holds default values for current month and year, for styling of current day

  setDate(){
    this.monthDays = _.range(1, this.daysInMonth(this.year, this.month+1) + 1);
    this.firstDayOfMonth = _.range(0, new Date(this.year, this.month, 1).getDay());
  }
  //Sets values for days of month to be displayed in expected format

  daysInMonth(year: number, month: number){
    return new Date(year, month, 0).getDate();
  }
  //Returns number of days in the month

  changeDate(){
    let hold = this.newMonthForm.value.date.split("-")
    this.year = +hold[0];
    this.month = +hold[1] - 1;
    this.setDate();
  }
  //Sets values of selected month, and resets calender display values

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}