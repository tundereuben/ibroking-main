import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subclass } from '../../../models/Subclass';
import { Covertype } from '../../../models/Covertype'; 

@Component({
  selector: 'app-covertype-edit',
  templateUrl: './covertype-edit.component.html',
  styleUrls: ['./covertype-edit.component.css']
})
export class CovertypeEditComponent implements OnInit {
  subclasses: Subclass[];
  covertypes: Covertype[];

  id: string;
  covertype: Covertype = {
    id: '',
    name: '',
    code: '',
    description: '',
    subclassCode: ''
  };

  // Initialize ARRAYS & VARIABLES for subclassCode => For Dropdowns
  subclassCodes: string[] = [];   subclassCode = this.covertype.subclassCode;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getCovertype(this.id).subscribe(covertype => {
      this.covertype = covertype;
      // console.log(covertype)
    })

    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;      
      for (var i=0; i < this.subclasses.length; i++) {
        this.subclassCodes.push(this.subclasses[i].code);
      }
    });
  }

  onSubmit({value, valid}: {value: Covertype, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Update Covertype
      value.id = this.id;
      value.subclassCode = this.subclassCode;
      this.setupService.updateCovertype(value);
      this.flashMessage.show('Covertype Updated', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['/covertypes']);
    }
  }

}
