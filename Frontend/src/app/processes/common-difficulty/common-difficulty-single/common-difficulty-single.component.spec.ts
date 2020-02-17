import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDifficultySingleComponent } from './common-difficulty-single.component';

describe('CommonDifficultySingleComponent', () => {
  let component: CommonDifficultySingleComponent;
  let fixture: ComponentFixture<CommonDifficultySingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDifficultySingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDifficultySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
