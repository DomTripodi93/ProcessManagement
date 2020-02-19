import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveFullComponent } from './objective-full.component';

describe('ObjectiveFullComponent', () => {
  let component: ObjectiveFullComponent;
  let fixture: ComponentFixture<ObjectiveFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
