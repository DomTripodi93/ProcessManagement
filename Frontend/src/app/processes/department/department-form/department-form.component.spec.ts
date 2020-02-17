import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFormComponent } from './department-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DepartmentFormComponent', () => {
  let component: DepartmentFormComponent;
  let fixture: ComponentFixture<DepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
          ReactiveFormsModule,
          HttpClientTestingModule
      ],
      declarations: [ DepartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set department.deptName to searchable value', ()=>{
    let mockDeptName = "department/other "
    mockDeptName = component.prepDeptName(mockDeptName);
    expect(mockDeptName === "Department-other").toBeTruthy();
  });
});
