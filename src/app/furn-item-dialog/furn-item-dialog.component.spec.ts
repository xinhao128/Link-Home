import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnItemDialogComponent } from './furn-item-dialog.component';

describe('FurnItemDialogComponent', () => {
  let component: FurnItemDialogComponent;
  let fixture: ComponentFixture<FurnItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
