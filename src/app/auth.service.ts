import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './model/user';

@Injectable()
export class AuthService {

  // private messaageSource = new BehaviorSubject(false);
  // currentMessage = this.messaageSource.asObservable();

  user: Observable<User>;
  userNotExist: boolean = false;
  acctInUse: boolean = false;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
  // Get auth data, then get firestore user document to access all fields
  // user is an Observable
	  this.user = this.afAuth.authState.pipe(
	    switchMap(user => {
	      if (user) {
	        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
	      } else {
	        return of(null);
	      }
	    })
	  )
  }
  
  isAnthenticated() {
    return this.afAuth.authState;
  }

  emailSignup(userSignupForm) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(userSignupForm['userEmail'], userSignupForm['userPassword'])
      .then(credential => {
        this.router.navigate(['']);
        this.afs.doc(`users/${credential.user.uid}`).set({
          userId: credential.user.uid,
          username: userSignupForm['userName'],
          email: userSignupForm['userEmail'],
          phone: userSignupForm['userContacts']['phoneNum'] || null,
          weChat: userSignupForm['userContacts']['weChatAcct'] || null,
          facebook: userSignupForm['userContacts']['facebookAcct'] || null,
          prefContact: userSignupForm['preferredContact'],
          hasAgreedContract: userSignupForm['hasAgreedContract']
        });
      }).catch(error => {
        if (error.code == "auth/email-already-in-use") {
          this.acctInUse = true;
        }
      });
  }

  emailSignin(userSigninForm) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(userSigninForm['userEmail'], userSigninForm['userPassword'])
      .then(credential => {
          this.router.navigate(['']);
      })
      .catch(error => {
        if (error.code == "auth/user-not-found") {
          this.userNotExist = true;
        }
        else if (error.code == "auth/wrong-password") {
          this.userNotExist = true;
        }
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      setTimeout(() => {
        this.router.navigate(['']);
      }, 200);
    });
  }

  // changeMessage(message: boolean) {
  //   this.messaageSource.next(message);
  // }
}