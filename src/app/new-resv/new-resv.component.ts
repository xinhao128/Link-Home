import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormService } from '../form.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, 
  FormControl, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { FurnItemDialogComponent } from '../furn-item-dialog/furn-item-dialog.component';
import { filter } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

// check errors immediately
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-new-resv',
  templateUrl: './new-resv.component.html',
  styleUrls: ['./new-resv.component.scss']
})

export class NewResvComponent implements OnInit {

	resvForm: FormGroup;
	isLinear: boolean = false;
  matcher = new MyErrorStateMatcher();
  time$: any; // json time
  itemDialogRef: MatDialogRef<FurnItemDialogComponent>;
  floorNum = ["1", "2", "3+"];
  preLoadedFurnList = ['Table', 'Chair', 'Bed'];

  formattedDate: any;
  formattedStartTime: any;
  // formattedEndTime: any;
  pipe = new DatePipe('en-US');
  // startTimeConflict: boolean = false;
  // endTimeConflict: boolean = false;
  // timeLst = [];

  constructor(private fb: FormBuilder, public auth: AuthService, private formService: FormService, 
    private http: HttpClient, private dialog: MatDialog) { 
      // this.formService.scheduleForm.subscribe(time => {
      //    this.timeLst.push(time);
      // })
  }

  ngOnInit() {
    this.time$ = this.http.get('assets/timeSlot.json');
    this.buildForm();
    this.onChanges();
  }

  buildForm() {
    this.resvForm = this.fb.group({
      basicQuestions: this.fb.group({
        destFrom: ['', [Validators.required]],
        destTo: ['', [Validators.required]],
        initTime: this.fb.group({
          workDate: ['', [Validators.required]],
          timeFrom: ['', [Validators.required]]
        })
      }),
      serviceQuestions: this.fb.group({
        floor: ['', [Validators.required]],
        elevator: [''],
        serviceType: this.fb.group({
          simpleTask: [''],
          assembly: [''],
          disassembly: [''],
          packing: [''],
          xtraBoxes: [{value: '', disabled: true}]
        })
      }),
      furnList: this.fb.group({
        items: this.fb.array([])
      }),
      confirmation: this.fb.group({
      }),
      submittedTime: ['']
    });
    for (let item of this.preLoadedFurnList) {
      const newItem = this.fb.group({
        furnName: item,
        furnCnt: "0",
        furnDesp: "N/A"
      });
      this.itemForm.push(newItem);
    }
  }

  get itemForm() {
    return this.resvForm.get('furnList').get('items') as FormArray;
  }

  addItem(oldItem?, i?) {
    this.itemDialogRef = this.dialog.open(FurnItemDialogComponent, {
      width: '500px',
      data: {
        furnName: oldItem ? oldItem.get('furnName').value : '',
        furnCnt: oldItem ? oldItem.get('furnCnt').value : 0,
        furnDesp: oldItem ? oldItem.get('furnDesp').value : ''
      }
    });

    this.itemDialogRef.afterClosed().pipe(
      filter(item => item)
    ).subscribe(item => {
      if (oldItem) {
        this.itemForm.at(i).patchValue({
          furnName: item.furnName,
          furnCnt: item.furnCnt,
          furnDesp: item.furnDesp
        });
      }
      else {
        const newItem = this.fb.group({
          furnName: item.furnName,
          furnCnt: item.furnCnt,
          furnDesp: item.furnDesp
        });
        this.itemForm.push(newItem);
      }
    })
  }

  deleteItem(i) {
    this.itemForm.removeAt(i);
  }

  onChanges() {
    this.resvForm.get('serviceQuestions').get('floor').valueChanges.subscribe(
      floor => {
         if (floor < 2) {
           this.resvForm.get('serviceQuestions').get('elevator').reset();
           this.resvForm.get('serviceQuestions').get('elevator').disable();
         }
         else {
           this.resvForm.get('serviceQuestions').get('elevator').enable();           
         }
      });
    this.resvForm.get('serviceQuestions').get('serviceType').get('simpleTask').valueChanges.subscribe(
      simple => {
        if (simple) {
          this.resvForm.get('serviceQuestions').get('serviceType').get('assembly').reset();
          this.resvForm.get('serviceQuestions').get('serviceType').get('assembly').disable();
          this.resvForm.get('serviceQuestions').get('serviceType').get('disassembly').reset();
          this.resvForm.get('serviceQuestions').get('serviceType').get('disassembly').disable();
          this.resvForm.get('serviceQuestions').get('serviceType').get('packing').reset();
          this.resvForm.get('serviceQuestions').get('serviceType').get('packing').disable();
        }
        else {
          this.resvForm.get('serviceQuestions').get('serviceType').get('assembly').enable();          
          this.resvForm.get('serviceQuestions').get('serviceType').get('disassembly').enable();          
          this.resvForm.get('serviceQuestions').get('serviceType').get('packing').enable();          
        }
      });
    this.resvForm.get('serviceQuestions').get('serviceType').get('packing').valueChanges.subscribe(
      packing => {
        if (packing) {
          this.resvForm.get('serviceQuestions').get('serviceType').get('xtraBoxes').enable();
        }
        else {
          this.resvForm.get('serviceQuestions').get('serviceType').get('xtraBoxes').reset();
          this.resvForm.get('serviceQuestions').get('serviceType').get('xtraBoxes').disable();        
        }
    });
    this.resvForm.get('basicQuestions').get('initTime').valueChanges.subscribe(
      date => {
        if (date.workDate) {
          this.formattedDate = (new Date(date.workDate)).toLocaleDateString();
        }
        if (date.timeFrom) {
          this.formattedStartTime = this.formattedDate + 
            " " + this.convertTimeFormat(date.timeFrom);
        }
      });
    // this.itemForm.valueChanges.subscribe(item => {
    //   console.log(item);
    // });

  }
  // timeValidation() {
  //   // start - 1.5 hrs
  //   this.startTimeConflict = false;
  //   this.endTimeConflict = false;
  //   console.log(this.startTimeConflict, this.endTimeConflict);
  //   const startTimeShifted = +new Date(
  //     new Date(this.formattedStartTime).getTime() - (1.5 * 60 * 60 * 1000));
  //   console.log(startTimeShifted);
  //   // end + 1.5 hrs
  //   const endTimeShifted = +new Date(
  //     new Date(this.formattedEndTime).getTime() + (1.5 * 60 * 60 * 1000));
  //   console.log(endTimeShifted);

  //   this.timeLst.forEach( doc => {
  //       let startTime = +new Date(doc.startTime);
  //       let endTime = +new Date(doc.endTime);
  //       if (startTimeShifted > startTime) {
  //         if (startTime < endTimeShifted && endTime > startTimeShifted) {
  //           this.startTimeConflict = true;
  //           console.log(this.startTimeConflict);
  //         }
  //       }
  //       else if (startTimeShifted < startTime) {
  //          if (startTimeShifted < endTime && endTimeShifted > startTime) {
  //            this.endTimeConflict = true;
  //            console.log(this.endTimeConflict);
  //          }
  //       }
  //       else if (startTimeShifted == startTime) {
  //         this.startTimeConflict = true;
  //         console.log(this.startTimeConflict);
  //       }
  //      });
  // }

  // convert 12hr format to 24hr format
  convertTimeFormat(startTime) {
    let time = startTime;
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    let ampm = time.match(/\s(.*)$/)[1];
    if (ampm == "PM" && hours < 12) hours = hours + 12;
    if (ampm == "AM" && hours == 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  }
  get destFrom() {
  	return this.resvForm.get('basicQuestions').get('destFrom');
  }
  get destTo() {
  	return this.resvForm.get('basicQuestions').get('destTo');
  }
  get floor() {
    return this.resvForm.get('serviceQuestions').get('floor');
  }
  get date() {
    return this.resvForm.get('basicQuestions').get('initTime').get('workDate');
  }
  get duration() {
    return this.resvForm.get('confirmation').get('duration');
  }
  submitForm() {
    let submitted = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    this.resvForm.get('basicQuestions').get('initTime').patchValue(
      {workDate: this.formattedDate, timeFrom: this.formattedStartTime});
    this.resvForm.patchValue({submittedTime: submitted});
  	const formValue = this.resvForm.value;
    console.log(formValue);
  	try {
  		this.formService.addForm(formValue);
      // this.formService.addTime(this.formattedStartTime, this.formattedEndTime);
  	} catch(err) {
  		console.log(err);
  	}
  }
}