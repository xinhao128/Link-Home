import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment.prod';
import { AuthService } from './auth.service';
import { FormService } from './form.service';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { SlickModule } from 'ngx-slick';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewResvComponent } from './new-resv/new-resv.component';
import { SigninComponent } from './signin/signin.component';
import { IncomingResvComponent } from './incoming-resv/incoming-resv.component';
import { FurnItemDialogComponent } from './furn-item-dialog/furn-item-dialog.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditResvComponent } from './edit-resv/edit-resv.component';
import { ViewResvComponent } from './view-resv/view-resv.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    NewResvComponent,
    SigninComponent,
    IncomingResvComponent,
    FurnItemDialogComponent,
    SignupComponent,
    UserProfileComponent,
    EditProfileComponent,
    EditResvComponent,
    ViewResvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'link-home-v1'),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatDialogModule,
    FlexLayoutModule,
    OverlayModule,
    HttpClientModule,
    SlickModule.forRoot()
  ],
  entryComponents: [FurnItemDialogComponent],
  providers: [AuthService, FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
