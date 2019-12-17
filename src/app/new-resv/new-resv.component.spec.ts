import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResvComponent } from './new-resv.component';

describe('NewResvComponent', () => {
  let component: NewResvComponent;
  let fixture: ComponentFixture<NewResvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
