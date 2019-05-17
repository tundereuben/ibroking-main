import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Section } from '../../../models/Section';
import { Covertype } from '../../../models/CoverType';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.css']
})
export class SectionAddComponent implements OnInit {
  // covertypes: Covertype[];

  // Initialize ARRAYS & VARIABLES for classCode & productCode => For Dropdowns
  // covertypeCodes: string[] = [];   covertypeCode = null;

  sections: Section[];
  section: Section = {}

  @ViewChild('sectionForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit({value, valid}: {value: Section, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000});
    } else {
      const sub = this.setupService.addSection(value)
      .subscribe(data => {
        console.log(data);
        this.section = data;
        this.flashMessage.show('New section added', { cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/sections']);
      }); 
    }
  }

}
