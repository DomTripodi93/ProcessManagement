import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPracticeFormComponent } from './best-practice-form.component';

describe('BestPracticeFormComponent', () => {
  let component: BestPracticeFormComponent;
  let fixture: ComponentFixture<BestPracticeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestPracticeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestPracticeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
