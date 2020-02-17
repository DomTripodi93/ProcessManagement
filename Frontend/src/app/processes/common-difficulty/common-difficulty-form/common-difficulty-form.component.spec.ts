import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDifficultyFormComponent } from './common-difficulty-form.component';

describe('CommonDifficultyFormComponent', () => {
  let component: CommonDifficultyFormComponent;
  let fixture: ComponentFixture<CommonDifficultyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDifficultyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDifficultyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
