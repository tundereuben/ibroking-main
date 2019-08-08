import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router } from '@angular/router';

import { Underwriter } from '../../../models/Underwriter';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-underwriter-add',
  templateUrl: './underwriter-add.component.html',
  styleUrls: ['./underwriter-add.component.css']
})
export class UnderwriterAddComponent implements OnInit {
  underwriter: Underwriter = {};
  underwriters: Underwriter[] ;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

   // When the form is submitted
   onSubmit(underwriterForm: NgForm) {
    if (!underwriterForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.setupService.addUnderwriter(underwriterForm.value)
        .subscribe(response => {
          // this.flashMessage.show('New underwriter added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getUnderwriters().subscribe(underwriters => this.underwriters = underwriters);
          console.log(response),
          this.underwriter = response,
          err => console.log(err),
          this.router.navigate([`/crm`]);
        });
        
    }
  }

} 
