import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Schedule } from '../schedule.model';
import { ScheduleService } from '../schedule.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HelperService } from 'src/app/shared/helper.service';
import { EmployeeService } from '../../employees/employee.service';

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
  employeeName: string;
  editMode = false;
  subscriptions: Subscription[] =[];
  scheduledTasks: Schedule[] = [];
  inputSchedule: Schedule;

  constructor(
    private helpers: HelperService,
    private scheduleServ: ScheduleService,
    private employeeServ: EmployeeService,
    private route: ActivatedRoute
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
      this.setDaySelection(params["year"], params["month"], params["day"]);
      this.fetchScheduledTasks();
      if (this.employeeId){
        this.setEmployeeName();
      }
    }));
  }

  setEmployeeName(){
    if (this.scheduleServ.employeesForSelection[this.employeeId]){
      this.employeeName = this.scheduleServ.employeesForSelection[this.employeeId];
    } else {
      this.getEmployeeName();
    }
  }
  //Sets cached employee's name value, or retrieves employee name if not cached

  getEmployeeName(){
    this.subscriptions.push(
      this.employeeServ.fetchSingleEmployee(this.employeeId).subscribe(employee =>{
        this.employeeName = employee.name;
      })
    );
  }
  //Retrieves employee's name when it is not found in cache

  setDaySelection(year: string, month: string, day: string){
    this.scheduleServ.selectedDate = this.helpers.setDateForIso(year, month, day);
    this.scheduleServ.usingSpecificDate = true;
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
    });
    this.scheduleServ.usingSpecificDate = false;
  }
  //Unsubscribes from all component subscriptions

}
