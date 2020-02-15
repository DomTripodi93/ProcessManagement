import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-single',
  templateUrl: './department-single.component.html',
  styleUrls: ['./department-single.component.css']
})
export class DepartmentSingleComponent implements OnInit, OnDestroy {
  @Input() department: Department;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;

  constructor(
    private deptServ: DepartmentService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.deptServ.deptCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editDepartment(){
    this.editMode = true;
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
