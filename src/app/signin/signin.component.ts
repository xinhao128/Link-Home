import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	userForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder, public auth: AuthService) { 

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });
  }
  signin() {
    this.auth.emailSignin(this.userForm.value);
  }
  get userEmail() {
  	return this.userForm.get('userEmail');
  }
  get userPassword() {
  	return this.userForm.get('userPassword');
  }
}
