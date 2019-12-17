import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { AuthService } from './auth.service';
import { User } from './model/user';
import { Form } from './model/Form';

// export interface Schedule {
//   startTime: Date,
//   endTime: Date
// }

@Injectable()
export class FormService {
  userProf: AngularFirestoreDocument<User>;
  resvFormCollection: AngularFirestoreCollection<Form>;
  userResvFormCollection: AngularFirestoreCollection<Form>;
  // scheduleCollection: AngularFirestoreCollection<Schedule>;
  resvForm: Observable<Form[]>;
  userResvForm: Observable<Form[]>;
  // scheduleForm: Observable<Schedule[]>;
  resvDoc: AngularFirestoreDocument<Form>;
  formSubmitted: number;
  uid: string;
  profileReadMode: boolean = true;

  constructor(public afs: AngularFirestore, private auth: AuthService, private router: Router) { 
  	this.resvFormCollection = this.afs.collection<Form>('reservations');
    // this.scheduleCollection = this.afs.collection<Schedule>('schedule');
    // this.scheduleForm = this.scheduleCollection.valueChanges();
    this.auth.user.subscribe(user => {
      if (user) {
        this.formSubmitted = user.formSubmitted;
        this.uid = user.userId; 
      }
    });
    // this.resvFormCollection = this.afs.collection('reservations');
    // , ref => ref.orderBy('timeStamp','desc')
  }

  // get all task forms submitted by a particular user
  getUserForms(userId) {
    this.userResvFormCollection = this.afs.collection<Form>('reservations', 
      ref => ref.where('userId', '==',`${userId}`));
    this.userResvForm = this.userResvFormCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Form;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.userResvForm;
  }

  //get all task forms with their ids; worker UI needed
  getAllForms(){
    this.resvForm = this.resvFormCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Form;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.resvForm;
  }

  // add a document to firestore
  addForm(taskForm){
    // new form count +1
    this.formSubmitted += 1;
    // url = (uid) + numofFormsSubmitted of that user
	 	const url = this.uid + '+' + this.formSubmitted;

    this.resvFormCollection.doc(url).set(taskForm);
    this.resvFormCollection.doc(url).update({"userId": this.uid});
    // keep track of how many forms the user has submitted
		var docRef = this.afs.doc(`users/${this.uid}`).ref;
    var batch = this.afs.firestore.batch();
    batch.update(docRef, {"formSubmitted": this.formSubmitted});
    batch.commit();
    // go back to homepage
    this.router.navigate(['']);
  }
  
  // update user profile
  updateUser(userProfile) {
    this.userProf = this.afs.doc(`users/${this.uid}`);
    this.userProf.update(userProfile);
  }
  // addTime(start, end) {
  //     const url = this.uid + '+' + this.formSubmitted;
  //     this.scheduleCollection.doc(url).set({
  //       startTime: start,
  //       endTime: end
  //     });
  // }

  // delete submitted form
  deleteForm(id){
    this.resvFormCollection.doc(`${id}`).delete();
    //this.scheduleCollection.doc(`${id}`).delete();
  }
}
