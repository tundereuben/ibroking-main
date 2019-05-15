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
  classes: setupClass[];

  // Initialize ARRAYS & VARIABLES for classCode & productCode => For Dropdowns
  classCodes: string[] = [];   classCode = null;
 
  subclass: Subclass = {
    id: '',
    name: '',
    code: '',
    description: '',
    // shortDescription: '',
    classCode: ''
  };

  @ViewChild('subclassForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,  
    private router: Router
  ) { }

  ngOnInit() {
    // this.setupService.getClasses().subscribe(classes => {
    //   this.classes = classes;
    //   for (var i=0; i < this.classes.length; i++) {
    //     this.classCodes.push(this.classes[i].code);
    //   }
      
    // });

    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;
      // this.classCodes = ['a', 'b', 'c'];      
    })
  }

  onSubmit({value, valid}: {value: Subclass, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Subclass
      value.classCode = this.classCode;
      this.setupService.newSubclass(value);
      this.flashMessage.show('New Subclass Added', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['/subclass']);
    }
  }

  // Set the classCode and productCode
  setClassCode(e) {
    var index = this.classCodes.indexOf(e);
    this.classCode = this.classCode[index].classCode;
  }

}

