import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import _ from 'lodash';
import { ScheduleService } from './schedule.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @ViewChild('newMonth') newMonthForm: NgForm;
  subscriptions: Subscription[] = [];
  addMode: boolean = false;
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
  numberOfDays: number;
  monthDays = [];
  firstDayOfMonth = [];
  firstDay: Date;

  constructor(
    private scheduleServ: ScheduleService
  ) { }

  ngOnInit() {
    this.initializeMonth();
    this.scheduleServ.getEmployees();
    this.scheduleServ.getDeparments();
  }

  addSchedule(){
    this.addMode = true;
    this.subscribeToCancel();
  }
  //Displays schedule form for adding new schedule

  subscribeToCancel(){
    this.subscriptions.push(this.scheduleServ.scheduleCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add schedule form

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

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}