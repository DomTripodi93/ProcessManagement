import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Schedule } from '../schedule.model';
import { Subscription } from 'rxjs';
import { ScheduleService } from '../schedule.service';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-schedule-single',
  templateUrl: './schedule-single.component.html',
  styleUrls: ['./schedule-single.component.css']
})
export class ScheduleSingleComponent implements OnInit, OnDestroy {
  @Input() schedule: Schedule;
  @Input() oneEmployee: boolean;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;
  time: string;

  constructor(
    private scheduleServ: ScheduleService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.subscribeToCancel();
    this.setTime();
  }

  setTime(){
    this.time = this.helpers.timeFromDate(this.schedule.date);
  }

  subscribeToCancel(){
    this.subscriptions.push(this.scheduleServ.scheduleCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }
  //subscribes component to cancelation signal

  editSchedule(){
    this.editMode = true;
  }
  //Shows edit form for selected Schedule

  onDelete(){
    if (confirm(
      "Are you sure you want to delete the scheduled " +this.schedule.objectiveName+ "?"
      )){
      this.scheduleServ.deleteSchedule(this.schedule.id).subscribe(()=>{
        this.scheduleServ.scheduleChanged.next();
      });
    }
  }
  //Deletes selected Schedule

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
