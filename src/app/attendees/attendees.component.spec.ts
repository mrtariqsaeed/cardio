import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesComponent } from './attendees.component';

describe('AttendeesComponent', () => {
  let component: AttendeesComponent;
  let fixture: ComponentFixture<AttendeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
