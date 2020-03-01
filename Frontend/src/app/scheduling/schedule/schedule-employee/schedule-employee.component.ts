import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrls: ['./schedule-employee.component.css']
})
export class ScheduleEmployeeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  employeeId: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  subscribeToParams(){
    this.subscriptions.push(this.route.params.subscribe((params: Params) =>{
      this.employeeId = params["employeeId"];
    }));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}
