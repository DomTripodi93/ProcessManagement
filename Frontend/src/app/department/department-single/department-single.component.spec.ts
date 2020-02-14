import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSingleComponent } from './department-single.component';

describe('DepartmentSingleComponent', () => {
  let component: DepartmentSingleComponent;
  let fixture: ComponentFixture<DepartmentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
