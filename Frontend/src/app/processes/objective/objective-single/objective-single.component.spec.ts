import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveSingleComponent } from './objective-single.component';

describe('ObjectiveSingleComponent', () => {
  let component: ObjectiveSingleComponent;
  let fixture: ComponentFixture<ObjectiveSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
