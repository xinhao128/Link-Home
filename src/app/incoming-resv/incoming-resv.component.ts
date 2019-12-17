import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormService } from '../form.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-incoming-resv',
  templateUrl: './incoming-resv.component.html',
  styleUrls: ['./incoming-resv.component.scss']
})
export class IncomingResvComponent implements OnInit {

	incomingResv: any;
	userId: string;
  pipe = new DatePipe('en-US');

  constructor(private auth: AuthService, private formService: FormService, private route: ActivatedRoute) { 
  	// get user id from url
    this.route.params.subscribe( params => this.userId = params.id );
  }

  ngOnInit() {
  	this.formService.getUserForms(this.userId).subscribe( resv => {
  		this.incomingResv = resv;
  	});
  }
  deleteForm(id) {
  	this.formService.deleteForm(id);
  }
}
