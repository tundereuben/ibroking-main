import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User} from '../../../models/User';

import {NgForm} from '@angular/forms'; 

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;
  user: User = {};
  users: User[] = [];

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getUser(this.id).subscribe(user => {
      this.user = user;
    });
  }

  // When the form is submitted
  onSubmit(userForm: NgForm) {
    if (!userForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.user = userForm.value;
      this.user.userId = this.id;
      this.setupService.updateUser(this.user).subscribe(response => {
          // this.flashMessage.show('New user added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getUsers().subscribe(users => this.users = users);
          console.log(response),
          this.user = response,
          err => console.log(err)
          this.router.navigate([`/user-details/${this.id}`]);
        });
        
    }
  }

}
