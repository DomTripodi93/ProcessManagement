import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';
import { Subscription } from 'rxjs';
import { HelperService } from '../../../shared/helper.service';

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
    private deptServ: DepartmentService,
    private helpers: HelperService
  ) { }

  ngOnInit() {
    this.department.deptName = this.helpers.dashToSlash(this.department.deptName);
    this.subscriptions.push(this.deptServ.deptCancel.subscribe(()=>{
      this.editMode = false;
    }));
  }

  editDepartment(){
    this.editMode = true;
  }

  onDelete(){
    if (confirm("Are you sure you want to delete the " +this.department.deptName+ " department?")){
      this.deptServ.deleteDepartment(this.department.deptName).subscribe(()=>{
        this.deptServ.deptChanged.next();
      });
    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
  }
  //Unsubscribes from all component subscriptions
}
