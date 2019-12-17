import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingResvComponent } from './incoming-resv.component';

describe('IncomingResvComponent', () => {
  let component: IncomingResvComponent;
  let fixture: ComponentFixture<IncomingResvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingResvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingResvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
