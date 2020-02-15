import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  @Input() departmentDefault: Department;
  canInput= false;
  departmentForm: FormGroup;
  isError = false;
  error = "";
  
  constructor(
    private deptServ: DepartmentService,
    public auth: AuthService,
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.pickForm();
  }

  pickForm(){
    if (this.departmentDefault){
      this.initForm(this.departmentDefault.deptName, this.departmentDefault.function)
    } else {
      this.initForm("", "");
    }
  }
    
  private initForm(name: string, funct: string) {
    this.departmentForm = new FormGroup({
      'deptName': new FormControl(name, Validators.required),
      'function': new FormControl(funct, Validators.required)
    });
  }

  onSubmit(){
    if (this.departmentDefault){
      this.updateDepartment({
        function: this.departmentForm.value.function
      });
    } else {
      this.newDepartment(this.departmentForm.value);
    }
  }

  updateDepartment(data: any) {
    this.deptServ.updateDepartment(data, this.departmentDefault.deptName).subscribe(()=>{
      this.deptServ.deptChanged.next();
    });
  }

  newDepartment(data: Department) {
    this.deptServ.addDepartment(data).subscribe(()=>{
      this.deptServ.deptChanged.next();
    },
    (error) =>{
      this.isError = true;
      this.error = "That department already exists";
    });
  }

  onCancel(){
    this.deptServ.deptCancel.next();
  }

  ngOnDestroy(){

  }

}
