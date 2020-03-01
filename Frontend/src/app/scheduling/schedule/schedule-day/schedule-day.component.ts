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
  subscriptions: Subscription[] =[];
  scheduledTasks: Schedule[] = [];

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
      this.employeeId = params["employee"];
      this.fetchScheduledTasks();
    }));
  }

  subscribeToChanges(){
    this.subscriptions.push(this.scheduleServ.scheduleChanged.subscribe(()=>{
      this.fetchScheduledTasks();
    }));
  }
  //subscribes to changes in schedule to cancel form

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
