import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Employee } from '../employee.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/shared/auth.service';
import { DepartmentService } from '../../../processes/department/department.service';
import { Subscription } from 'rxjs';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  @Input() employeeDefault: Employee;
  subscriptions: Subscription[] = [];
  departments: string[] = [""];
  canEdit: boolean[]= [false, true]
  canInput= false;
  employeeForm: FormGroup;
  isError = false;
  error = "";
  
  constructor(
    private employeeServ: EmployeeService,
    private deptServ: DepartmentService,
    private helpers: HelperService,
    public auth: AuthService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.getDepartments();
    this.pickForm();
  }

  getDepartments(){
    this.subscriptions.push(
      this.deptServ.fetchDepartments().subscribe(departments =>{
        departments.forEach(department =>{
          this.departments.push(department.deptName);
        })
      })
    );
  }
  //Gets all departments for user

  pickForm(){
    if (this.employeeDefault){
      this.initForm(this.employeeDefault)
    } else {
      let emptyEmployee: Employee = {
        name: "",
        deptName: "",
        title:"",
        canEdit: false
      };
      this.initForm(emptyEmployee);
    }
  }
  //Checks whether the form should be used for editing or creation of new model object
    
  private initForm(formEmployee: Employee) {
    this.employeeForm = new FormGroup({
      'name': new FormControl(formEmployee.name, Validators.required),
      'deptName': new FormControl(formEmployee.deptName),
      'title': new FormControl(formEmployee.name),
      'canEdit': new FormControl(formEmployee.canEdit, Validators.required),
    });
  }


  async onSubmit(){
    this.employeeForm.value.name = this.prepEmployeeName(this.employeeForm.value.name);
    if (this.employeeDefault){
      this.updateEmployee(this.employeeForm.value);
    } else {
      this.newEmployee(this.employeeForm.value);
    }
  }

  prepEmployeeName(name: string){
    return this.helpers.capitalize(name);
  }

  updateEmployee(data: any) {
    this.employeeServ.updateEmployee(
      data, 
      this.employeeDefault.employeeId
    ).subscribe(()=>{
      this.employeeServ.employeeChanged.next();
    });
  }

  newEmployee(data: Employee) {
    this.employeeServ.addEmployee(data).subscribe(()=>{
      this.employeeServ.employeeChanged.next();
    },
    () =>{
      this.isError = true;
      this.error = "That employee already exists";
    });
  }

  onCancel(){
    this.employeeServ.employeeCancel.next();
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}
