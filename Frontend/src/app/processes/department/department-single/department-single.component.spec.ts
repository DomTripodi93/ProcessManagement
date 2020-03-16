import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSingleComponent } from './department-single.component';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DepartmentSingleComponent', () => {
  let component: DepartmentSingleComponent;
  let fixture: ComponentFixture<DepartmentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
          ReactiveFormsModule,
          HttpClientTestingModule
      ],
      declarations: [ 
        DepartmentSingleComponent,
        DepartmentFormComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSingleComponent);
    component = fixture.componentInstance;
    component.department = {
      deptName: "Department",
      funcName: "functionality"
    } 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
