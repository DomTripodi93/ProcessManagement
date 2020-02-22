import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFullComponent } from './step-full.component';

describe('StepFullComponent', () => {
  let component: StepFullComponent;
  let fixture: ComponentFixture<StepFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
