import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResvComponent } from './edit-resv.component';

describe('EditResvComponent', () => {
  let component: EditResvComponent;
  let fixture: ComponentFixture<EditResvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
