import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSingleComponent } from './step-single.component';

describe('StepSingleComponent', () => {
  let component: StepSingleComponent;
  let fixture: ComponentFixture<StepSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
