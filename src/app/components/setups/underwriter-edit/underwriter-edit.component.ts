import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Underwriter } from '../../../models/Underwriter';

import {NgForm} from '@angular/forms'; 


@Component({
  selector: 'app-underwriter-edit',
  templateUrl: './underwriter-edit.component.html',
  styleUrls: ['./underwriter-edit.component.css']
})
export class UnderwriterEditComponent implements OnInit {
  id: number;
  underwriter: Underwriter = {};
  underwriters: Underwriter[] = [];

  country: string = null;
  countries: any[] = [];

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getUnderwriter(this.id).subscribe(underwriter => {
      this.underwriter = underwriter;
    });

    this.setupService.getCountries().subscribe(countries => {
      this.countries = countries;
    })
  }

  // When the form is submitted
  onSubmit(underwriterForm: NgForm) {
    if (!underwriterForm) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      this.underwriter = underwriterForm.value;
      this.underwriter.undCode = this.id;
      this.setupService.updateUnderwriter(this.underwriter)
        .subscribe(response => {
          // this.flashMessage.show('New underwriter added', { cssClass: 'alert-success', timeout: 4000 });
          this.setupService.getUnderwriters().subscribe(underwriters => this.underwriters = underwriters);
          // console.log(response),
          this.underwriter = response,
          err => console.log(err)
          this.router.navigate([`/underwriter-details/${this.id}`]);
        });
        
    }
  }

}
