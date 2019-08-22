import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../services/setup.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedInUser: User;
    
  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  // When the form is submitted
  onSubmit(loginForm: NgForm) {
    if (!loginForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.setupService.loginUser(loginForm.value)
        .subscribe(response => {
          this.authService.sendToken(response);
          this.loggedInUser =  this.authService.getToken();
          this.router.navigate(["/"]);
        });
        
    }
  }


}
