import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Schedule } from '../schedule.model';
import { ScheduleService } from '../schedule.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.css']
})
export class ScheduleDayComponent implements OnInit, OnDestroy {
  day: number;
  month: number;
  year: number;
  employeeId: number;
  editMode = false;
  subscriptions: Subscription[] =[];
  scheduledTasks: Schedule[] = [];
  inputSchedule: Schedule;

  constructor(
    private scheduleServ: ScheduleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscribeToParams();
    this.subscribeToChanges();
  }

  subscribeToParams(){
    this.subscriptions.push(this.route.params.subscribe((params: Params) =>{
      this.day = params["day"];
      this.month = params["month"];
      this.year = params["year"];
      this.employeeId = params["employeeId"];
      this.fetchScheduledTasks();
    }));
  }

  subscribeToChanges(){
    this.subscriptions.push(this.scheduleServ.scheduleChanged.subscribe(()=>{
      this.fetchScheduledTasks();
    }));
  }
  //subscribes to changes in schedule to cancel form

  subscribeToCancel(){
    this.subscriptions.push(this.scheduleServ.scheduleCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }
  //subscribes component to cancelation signal

  editSchedule(schedule: Schedule){
    if (this.editMode){
      this.editMode = false;
      setTimeout(()=>{this.editSchedule(schedule)}, 10)
    } else {
      this.subscribeToCancel();
      this.inputSchedule = schedule;
      this.editMode = true;
    }
  }
  //Shows edit form for selected Schedule

  onDelete(schedule: Schedule){
    if (confirm(
      "Are you sure you want to delete the scheduled " + schedule.objectiveName + "?"
      )){
      this.scheduleServ.deleteSchedule(schedule.id).subscribe(()=>{
        this.scheduleServ.scheduleChanged.next();
      });
    }
  }
  //Deletes selected Schedule

  fetchScheduledTasks(){
    if (this.employeeId){
      this.scheduleServ.fetchSchedulesByEmployee(
        this.employeeId, this.month, this.year, this.day
      ).subscribe(scheduledTasks =>{
        this.scheduledTasks = scheduledTasks;
      });
    } else {
      this.scheduleServ.fetchSchedule(
        this.month, this.year, this.day
      ).subscribe(scheduledTasks =>{
        this.scheduledTasks = scheduledTasks;
      });
    }
  }
  //Retrieves all scheduled tasks for given day (and employee if neccessary)

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}
