import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Employee } from '../employee.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-employee-single',
  templateUrl: './employee-single.component.html',
  styleUrls: ['./employee-single.component.css']
})
export class EmployeeSingleComponent implements OnInit, OnDestroy {
  @Input() employee: Employee;
  @Input() inFull: boolean;
  subscriptions: Subscription[] = [];
  editMode: boolean = false;

  constructor(
    private employeeServ: EmployeeService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.employeeServ.employeeCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editEmployee(){
    this.editMode = true;
  }
  //Shows edit form for selected Employee

  onDelete(){
    if (confirm(
      "Are you sure you want to delete this employee: " +this.employee.name+ "?"
      )){
      this.employeeServ.deleteEmployee(this.employee.employeeId).subscribe(()=>{
        this.employeeServ.employeeChanged.next();
      });
    }
  }
  //Deletes selected Employee

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
