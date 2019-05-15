import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { setupClass } from '../../../models/Class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.css']
})
export class ClassAddComponent implements OnInit {
  classes: setupClass[];
  class: setupClass = new setupClass();
  private sub = Subscription;

  @ViewChild('classForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // onSubmit({value, valid}: {value: any, valid: boolean}) {
  //   if(!valid) {
  //     // Show error
  //     this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
  //   } else {
  //     this.setupService.createClass({value} as setupClass)
  //     // this.flashMessage.show('New class added', {cssClass: 'alert-success', timeout: 4000});
  //     // Redirect to class
  //     // this.router.navigate(['/class']);
  //   }
  // }

  onSubmit({value, valid}: {value: any, valid: boolean}){
    if(!valid)  {
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      const sub = this.setupService.addClass(this.class)
      .subscribe(data => {
        this.class = data;
        this.flashMessage.show('New class added', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/class']);
        console.log(this.class);
    })
    }  
  }
}
