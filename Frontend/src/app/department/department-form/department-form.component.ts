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
  
  constructor(
    private deptServ: DepartmentService,
    public auth: AuthService,
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
  }

  pickForm(){
    if (this.departmentDefault){
      this.initForm(this.departmentDefault.deptName, this.departmentDefault.function)
    } else {
      this.initForm("", "");
    }
  }
    
  private initForm(name, funct) {
    this.departmentForm = new FormGroup({
      'deptName': new FormControl(name, Validators.required),
      'function': new FormControl(funct, Validators.required)
    });
  }

  onSubmit(){
    this.newDepartment(this.departmentForm.value);
  }

  newDepartment(data: Department) {
    this.deptServ.addDepartment(data).subscribe(()=>{
      this.deptServ.deptChanged.next();
    });
  }

  onCancel(){
    this.deptServ.deptCancel.next();
  }

  ngOnDestroy(){

  }

}
