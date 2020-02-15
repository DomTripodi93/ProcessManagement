import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from './department.service';
import { AuthService } from '../shared/auth.service';
import { Department } from './department.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  departments: Department[] = [];
  addMode: boolean = false;

  constructor(
    private deptServ: DepartmentService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.deptServ.deptChanged.subscribe(()=>{
      this.addMode = false;
      this.getDepartments();
    }));
    this.getDepartments();
  }

  getDepartments(){
    this.subscriptions.push(
      this.deptServ.fetchDepartments().subscribe(departments =>{
        this.departments = departments;
      })
    );
  }
  //Gets all departments for user

  addDepartment(){
    this.addMode = true;
  }
  //Displays department form for adding new department

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}
