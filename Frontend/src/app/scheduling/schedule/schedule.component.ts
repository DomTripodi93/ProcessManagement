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
  subscriptions: Subscription[] = [];
  addMode: boolean = false;

  constructor(
    private scheduleServ: ScheduleService
  ) { }

  ngOnInit() {
    this.getEmployeesAndDepartmentsForForm();
    this.subscribeToChanges();
  }

  getEmployeesAndDepartmentsForForm(){
    this.scheduleServ.getEmployees();
    this.scheduleServ.getDeparments();
  }
  //stores values for all employees departments and related objectives for quick 
  // lookup in scheduled task creation form

  addSchedule(){
    this.addMode = true;
    this.subscribeToChanges();
  }
  //Displays schedule form for adding new schedule

  subscribeToChanges(){
    this.subscriptions.push(this.scheduleServ.scheduleChanged.subscribe(()=>{
      this.scheduleServ.scheduleCancel.next();
    }));
  }
  //subscribes to changes in schedule to cancel form

  subscribeToCancel(){
    this.subscriptions.push(this.scheduleServ.scheduleCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add schedule form

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
