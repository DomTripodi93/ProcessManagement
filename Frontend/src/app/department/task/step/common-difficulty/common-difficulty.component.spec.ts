import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDifficultyComponent } from './common-difficulty.component';

describe('CommonDifficultyComponent', () => {
  let component: CommonDifficultyComponent;
  let fixture: ComponentFixture<CommonDifficultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDifficultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
