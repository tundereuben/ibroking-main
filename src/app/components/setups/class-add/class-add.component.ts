import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Class } from '../../../models/Class';

@Component({
  selector: 'app-class-add',
  templateUrl: './class-add.component.html',
  styleUrls: ['./class-add.component.css']
})
export class ClassAddComponent implements OnInit {
  classes: Class[];

  class: Class = {
    code: '',
    description: '',
    name: '',
    // shortDescription: ''
  }

  @ViewChild('classForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getClasses().subscribe(classes => {
    })
  }

  onSubmit({value, valid}: {value: Class, valid: boolean}) {
    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      this.setupService.newClass(value);
      this.flashMessage.show('New class added', {cssClass: 'alert-success', timeout: 4000});
      // Redirect to class
      this.router.navigate(['/class']);
    }
  }

}
