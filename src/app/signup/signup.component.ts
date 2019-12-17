import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
		let password = AC.get('userPassword').value; // to get value in input tag
		let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
		if(password != confirmPassword) {
		  AC.get('confirmPassword').setErrors( {MatchPassword: true} )
		} else {
		  return null;
		}
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder, public auth: AuthService) { 

  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, 
      	Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      userEmail: ['', [Validators.required,
      	Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userPassword: ['', [Validators.required, 
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userContacts: this.fb.group({
	  		phoneNum: ['', [ 
	      	Validators.pattern('^[0-9]{3}[\s.-][0-9]{3}[\s.-][0-9]{4}$')]],
	      weChatAcct: [''],
	      facebookAcct: ['']
	  	}),
      preferredContact: ['', [Validators.required]],
      hasAgreedContract: ['', [Validators.required]]
    }, {
      validator: PasswordValidation.MatchPassword
    });

  }
  signup() {
  	console.log(this.signupForm.value);
    this.auth.emailSignup(this.signupForm.value);
  }
  get userName() {
  	return this.signupForm.get('userName');
  }
  get userEmail() {
  	return this.signupForm.get('userEmail');
  }
  get userPassword() {
  	return this.signupForm.get('userPassword');
  }
  get confirmPassword() {
  	return this.signupForm.get('confirmPassword');
  }
  get phoneNum() {
  	return this.signupForm.get('userContacts').get('phoneNum');
  }
  emailTouched() {
  	return this.signupForm.value['userEmail'] != '';
  }
  phoneTouched() {
  	return this.signupForm.value['userContacts']['phoneNum'] != '';
  }
  weChatTouched() {
  	return this.signupForm.value['userContacts']['weChatAcct'] != '';
  }
  facebookTouched() {
  	return this.signupForm.value['userContacts']['facebookAcct'] != '';
  }
}