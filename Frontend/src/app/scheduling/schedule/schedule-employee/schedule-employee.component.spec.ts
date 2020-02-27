import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEmployeeComponent } from './schedule-employee.component';

describe('ScheduleEmployeeComponent', () => {
  let component: ScheduleEmployeeComponent;
  let fixture: ComponentFixture<ScheduleEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
