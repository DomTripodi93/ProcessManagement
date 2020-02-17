import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticeSingleComponent } from './best-practice-single.component';

describe('BestPracticeSingleComponent', () => {
  let component: BestPracticeSingleComponent;
  let fixture: ComponentFixture<BestPracticeSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestPracticeSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPracticeSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
