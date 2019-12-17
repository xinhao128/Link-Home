import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResvComponent } from './view-resv.component';

describe('ViewResvComponent', () => {
  let component: ViewResvComponent;
  let fixture: ComponentFixture<ViewResvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
