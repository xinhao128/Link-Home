import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormService } from '../form.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { tap, first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

	profileForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, 
  	private formService: FormService, private router: Router) { }

  ngOnInit() {
  	this.profileForm = this.fb.group({
      username: [''],
      email: [{value: '', disabled: true}],
      phone: [''],
      weChat: [''],
      facebook: [''],
      prefContact: ['']
    });
    this.preloadData();
  }
  preloadData() {
  	this.auth.user.pipe(
  		tap((data: any) => {
  			this.profileForm.patchValue(data);
  		})
  	).subscribe();
  }
  save() {
  	const formValue = this.profileForm.value;
  	try {
  		this.formService.updateUser(formValue);
  		this.router.navigate(['/profile']);
  	}
  	catch(err) {
  		console.log(err);
  	}
  }
}
