import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router } from '@angular/router';

import { Underwriter } from '../../../models/Underwriter';
import { Country } from '../../../models/Country';

import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-underwriter-add',
  templateUrl: './underwriter-add.component.html',
  styleUrls: ['./underwriter-add.component.css']
})
export class UnderwriterAddComponent implements OnInit {
  underwriter: Underwriter = {};
  underwriters: Underwriter[] ;

  country: Country = null;
  countries: Country[];

  errorMessage: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getCountries().subscribe(countries => {
      this.countries = countries;
    })
  }

   // When the form is submitted
   onSubmit(underwriterForm: NgForm) {
    if (!underwriterForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
        this.errorMessage = this.validateUnderwriter(underwriterForm.value);
        if(this.errorMessage !== '') {
          this.flashMessage.show(this.errorMessage, { cssClass: 'alert-danger', timeout: 10000 });
        } else {
          this.addNewUnderwriter(underwriterForm.value)
        }
    }
  }

  validateUnderwriter(underwriterForm){
    let message = ''; 
    
    if(!underwriterForm.undCompanyName) {
      message += '<p>Company Name missing</p>';
    };

    if(!underwriterForm.undMobile) {
      message += '<p>Phone Number missing</p>';
    };

    if(!underwriterForm.undEmail) {
      message += '<p>Email missing</p>';
    };

    return message;
  }

  // add New Underwriter
  addNewUnderwriter(underwriter){
    this.setupService.addUnderwriter(underwriter)
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
