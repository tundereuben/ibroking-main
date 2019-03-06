import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Subclass } from '../../../models/Subclass';
import { Covertype } from '../../../models/Covertype'; 


@Component({
  selector: 'app-covertype-add',
  templateUrl: './covertype-add.component.html',
  styleUrls: ['./covertype-add.component.css']
})
export class CovertypeAddComponent implements OnInit {
  subclasses: Subclass[];
  covertypes: Covertype[];

  // Initialize ARRAYS & VARIABLES for subclassCode => For Dropdowns
  subclassCodes: string[] = [];   subclassCode = null;
  // productCodes: string[] = []; productCode = null;
 
  covertype: Covertype = {
    id: '',
    name: '',
    code: '',
    description: '',
    subclassCode: ''
  };

  @ViewChild('covertypeForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;      
      for (var i=0; i < this.subclasses.length; i++) {
        this.subclassCodes.push(this.subclasses[i].code);
      }
    });
    // console.log(this.subclassCodes)
  }

  onSubmit({value, valid}: {value: Covertype, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Subclass
      value.subclassCode = this.subclassCode;
      this.setupService.newCovertype(value);
      this.flashMessage.show('New Covertype Added', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['/covertypes']);
    }
  }

}
