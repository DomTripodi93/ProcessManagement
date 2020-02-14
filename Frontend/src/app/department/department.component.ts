import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';
import { AuthService } from '../shared/auth.service';
import { Department } from './department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];

  constructor(
    private deptServ: DepartmentService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments(){
    this.deptServ.fetchDepartments().subscribe(departments =>{
      this.departments = departments;
    })
  }

}
