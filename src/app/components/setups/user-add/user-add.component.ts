import { Component, OnInit } from '@angular/core'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router } from '@angular/router';

import { User} from '../../../models/User';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  user: User = {};
  users: User[] ;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

   // When the form is submitted
   onSubmit(userForm: NgForm) {
    if (!userForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      console.log(userForm.value)
      this.setupService.addUser(userForm.value)
        .subscribe(response => {
          // this.flashMessage.show('New user added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getUsers().subscribe(users => this.users = users);
          console.log(response),
          this.user = response,
          err => console.log(err),
          this.router.navigate([`/crm`]);
        });
        
    }
  }

}
