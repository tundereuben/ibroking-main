import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Subclass } from '../../../models/Subclass';
import { setupClass } from '../../../models/Class';

@Component({
  selector: 'app-subclass-add',
  templateUrl: './subclass-add.component.html',
  styleUrls: ['./subclass-add.component.css'] 
})
export class SubclassAddComponent implements OnInit {
  subclasses: Subclass[];
  subclass: Subclass = {
    sclClaCode: null
  };
  classes: setupClass[];
  

  // Initialize ARRAYS & VARIABLES for classCode & productCode => For Dropdowns
  classCodes: number[] = [];   
 
  

  @ViewChild('subclassForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,  
    private router: Router
  ) { }

  ngOnInit() {
    this.setupService.getClasses().subscribe(classes => {
      this.classes = classes;  
    });

    // this.setupService.getSubclasses().subscribe(subclasses => {
    //   this.subclasses = subclasses;
    // })
  }

  onSubmit({value, valid}: {value: Subclass, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      const sub = this.setupService.addSubclass(this.subclass)
      .subscribe(data => {
        this.subclass = data;
        this.flashMessage.show('New subclass added', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/subclass']);
      });
    }
  }

  // Set the classCode and productCode
  // setClassCode(e) {
  //   var index = this.classCodes.indexOf(e);
  //   this.classCode = this.classCode[index].classCode;
  // }

}

