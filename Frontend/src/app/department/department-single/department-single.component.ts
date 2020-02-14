import { Component, OnInit, Input } from '@angular/core';
import { Department } from '../department.model';

@Component({
  selector: 'app-department-single',
  templateUrl: './department-single.component.html',
  styleUrls: ['./department-single.component.css']
})
export class DepartmentSingleComponent implements OnInit {
  @Input() department: Department;

  constructor() { }

  ngOnInit() {
  }

}
