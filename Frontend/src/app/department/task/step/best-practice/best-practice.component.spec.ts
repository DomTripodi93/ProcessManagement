import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticeComponent } from './best-practice.component';

describe('BestPracticeComponent', () => {
  let component: BestPracticeComponent;
  let fixture: ComponentFixture<BestPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
