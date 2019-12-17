import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormService } from '../form.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private auth: AuthService, private formService: FormService) { }

  ngOnInit() {
  }

}
