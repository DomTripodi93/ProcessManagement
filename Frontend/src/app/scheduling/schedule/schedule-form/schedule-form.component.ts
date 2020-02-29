import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../schedule.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  @Input() scheduleDefault: Schedule;
  canInput: boolean = false;
  scheduleForm: FormGroup;
  isError: boolean = false;
  error: string = "";
  employeeKeys = [];
  departments = [];
  objectives = [];
  noEmployees: boolean = false;
  
  constructor(
    public scheduleServ: ScheduleService,
    public auth: AuthService
  ){}
  
  ngOnInit(){
    this.canInput = this.auth.isAuthenticated;
    this.setFormValues();
  }

  setFormValues(){
    this.employeeKeys = Object.keys(this.scheduleServ.employeesForSelection);
    if (this.employeeKeys.length > 0){
      this.departments = Object.keys(this.scheduleServ.departmentsForSelection);
      this.pickForm();
    } else {
      this.noEmployees = true;
    }
  }
  //Sets employee keys for employee Id/Name pair selection,  and department/objective 
  // pair selection and then decides to initialize form where there are employees, 
  // or error message where there are no employees

  pickForm(){
    if (this.scheduleDefault){
      this.initForm(this.scheduleDefault)
    } else {
      let emptySchedule: Schedule = {
        employeeId: parseInt(this.employeeKeys[0]),
        employeeName: this.scheduleServ.employeesForSelection[this.employeeKeys[0]],
        objectiveName: this.scheduleServ.departmentsForSelection[this.departments[0]][0],
        deptName: this.departments[0],
        date: new Date().toISOString().slice(0, 16)
      };
      this.initForm(emptySchedule);
    }
  }
  //Checks whether the form should be used for editing or creation of new model object
  // and initializes form
    
  private initForm(formSchedule: Schedule) {
    this.scheduleForm = new FormGroup({
      'employeeId': new FormControl(formSchedule.employeeId),
      'employeeName': new FormControl(formSchedule.employeeName), 
      'objectiveName': new FormControl(formSchedule.objectiveName, Validators.required),
      'deptName': new FormControl(formSchedule.deptName, Validators.required),
      'date': new FormControl(formSchedule.date, Validators.required),
    });
    this.changeDepartment(formSchedule.deptName);
  }

  changeEmployee(employee){
    let employeeInfo = employee.split("-");
    this.scheduleForm.value.employeeId = parseInt(employeeInfo[0]);
    this.scheduleForm.value.employeeName = employeeInfo[1];
  }
  //Sets employee name value based on selected employee Id

  changeDepartment(department){
    this.objectives = this.scheduleServ.departmentsForSelection[department];
  }
  //Sets employee name value based on selected employee Id

  onSubmit(){
    if (this.scheduleDefault){
      this.updateSchedule(this.scheduleForm.value);
    } else {
      this.newSchedule(this.scheduleForm.value);
    }
  }

  updateSchedule(data: any) {
    this.scheduleServ.updateSchedule(
      data, 
      this.scheduleDefault.id
    ).subscribe(()=>{
      this.scheduleServ.scheduleChanged.next();
    });
  }

  newSchedule(data: Schedule) {
    this.scheduleServ.addSchedule(data).subscribe(()=>{
      this.scheduleServ.scheduleChanged.next();
    },
    () =>{
      this.isError = true;
      this.error = "That scheduled task already exists for this objective";
    });
  }

  onCancel(){
    this.scheduleServ.scheduleCancel.next();
  }

}