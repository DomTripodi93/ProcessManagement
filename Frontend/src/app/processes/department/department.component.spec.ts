import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComponent } from './department.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentSingleComponent } from './department-single/department-single.component';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
          ReactiveFormsModule,
          HttpClientTestingModule
      ],
      declarations: [ 
        DepartmentComponent,
        DepartmentFormComponent,
        DepartmentSingleComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
