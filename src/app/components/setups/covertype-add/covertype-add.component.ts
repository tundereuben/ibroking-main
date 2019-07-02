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
 
  covertype: Covertype = {};

  @ViewChild('covertypeForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;      
      // for (var i=0; i < this.subclasses.length; i++) {
      //   this.subclassCodes.push(this.subclasses[i].code);
      // }
    });
    // console.log(this.subclassCodes)
  }

  onSubmit({value, valid}: {value: Covertype, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      const sub = this.setupService.addCovertype(this.covertype)
      .subscribe(data => {
        this.covertype = data;
        this.flashMessage.show('New covertype added', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/covertypes']);
    })
    }
  }

}
