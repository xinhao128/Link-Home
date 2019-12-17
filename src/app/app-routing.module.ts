import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { NewResvComponent } from "./new-resv/new-resv.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { IncomingResvComponent } from "./incoming-resv/incoming-resv.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ViewResvComponent } from './view-resv/view-resv.component';
import { EditResvComponent } from './edit-resv/edit-resv.component';


const routes: Routes = [
	{ path: "", component: HomepageComponent },
	{ path: "reservation/new", component: NewResvComponent },
	{ path: "signin", component: SigninComponent },
	{ path: "signup", component: SignupComponent },
	{ path: "profile", component: UserProfileComponent},
	{ path: "profile/edit", component: EditProfileComponent },
	{ path: "reservation/incoming", component: IncomingResvComponent },
	{ path: "reservation/incoming/:id", component: IncomingResvComponent },
	{ path: "reservation/incoming/:id/view", component: ViewResvComponent },
	{ path: "reservation/incoming/:id/edit", component: EditResvComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
