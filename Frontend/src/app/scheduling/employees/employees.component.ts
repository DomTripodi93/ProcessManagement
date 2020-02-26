import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  employees: Employee[] = [];
  addMode: boolean = false;

  constructor(
    private employeeServ: EmployeeService,
    public authServ: AuthService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.employeeServ.employeeChanged.subscribe(()=>{
      this.employeeServ.employeeCancel.next();
      this.employees = [];
      this.getEmployees();
    }));
    this.getEmployees();
  }

  getEmployees(){
    this.subscriptions.push(
      this.employeeServ.fetchEmployees().subscribe(employees =>{
        this.employees = employees;
      })
    );
  }
  //Gets all employees for user

  addEmployee(){
    this.addMode = true;
    this.subscribeToCancel();
  }
  //Displays employee form for adding new employee

  subscribeToCancel(){
    this.subscriptions.push(this.employeeServ.employeeCancel.subscribe(()=>{
      this.addMode = false;
    }));
  }
  //subscribes to method of canceling add employee form

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions

}