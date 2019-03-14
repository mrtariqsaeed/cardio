import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmComponent } from './am.component';

describe('AmComponent', () => {
  let component: AmComponent;
  let fixture: ComponentFixture<AmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
