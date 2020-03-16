import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';
import { HelperService } from '../../../shared/helper.service';

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
    private helpers: HelperService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.pickForm();
  }

  pickForm(){
    if (this.departmentDefault){
      this.initForm(this.departmentDefault)
    } else {
      let emptyDepartment: Department = {
        deptName: "",
        funcName: ""
      };
      this.initForm(emptyDepartment);
    }
  }
  //Checks whether the form should be used for editing or creation of new model object
    
  private initForm(formDepartment: Department) {
    this.departmentForm = new FormGroup({
      'deptName': new FormControl(formDepartment.deptName, Validators.required),
      'funcName': new FormControl(formDepartment.funcName, Validators.required)
    });
  }

  async onSubmit(){
    if (this.departmentDefault){
      this.updateDepartment({
        funcName: this.departmentForm.value.funcName
      });
    } else {
      this.departmentForm.value.deptName = await this.prepDeptName(this.departmentForm.value.deptName);
      this.newDepartment(this.departmentForm.value);
    }
  }

  async prepDeptName(deptName: string){
    deptName = this.helpers.capitalize(deptName);
    deptName = this.helpers.slashToDash(deptName);
    deptName = await this.helpers.removeSpaceAtEnd(deptName);

    return deptName;
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
    () =>{
      this.isError = true;
      this.error = "That department already exists";
    });
  }

  onCancel(){
    this.deptServ.deptCancel.next();
  }

}
