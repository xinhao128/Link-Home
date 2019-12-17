import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-furn-item-dialog',
  templateUrl: './furn-item-dialog.component.html',
  styleUrls: ['./furn-item-dialog.component.scss']
})
export class FurnItemDialogComponent implements OnInit {

	form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FurnItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
  	this.form = this.fb.group({
  		furnName: this.data.furnName ? this.data.furnName : '',
  		furnCnt: this.data.furnCnt ? this.data.furnCnt : '',
  		furnDesp: this.data.furnDesp ? this.data.furnDesp : ''
  	})
  }
  submit(form) {
    this.dialogRef.close(form.value);
  }
}
