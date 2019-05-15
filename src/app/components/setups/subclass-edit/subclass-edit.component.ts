import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subclass } from '../../../models/Subclass';
import { setupClass } from '../../../models/Class';

@Component({
  selector: 'app-subclass-edit',
  templateUrl: './subclass-edit.component.html',
  styleUrls: ['./subclass-edit.component.css']
})
export class SubclassEditComponent implements OnInit {
  subclasses: Subclass[];
  classes: setupClass[];

  id: string;
  subclass: Subclass = {
    id: '',
    name: '',
    code: '',
    description: '',
    // shortDescription: '',
    classCode: '',
    productCode: ''
  };

  // Initialize ARRAYS & VARIABLES for classCode & productCode => For Dropdowns
  classCodes: string[] = [];   classCode = this.subclass.classCode;
  productCodes: string[] = []; productCode = this.subclass.productCode;


  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get id from url, then fetch client
    this.id = this.route.snapshot.params['id'];
    this.setupService.getSubclass(this.id).subscribe(subclass => {
      this.subclass = subclass;
    })

    // this.setupService.getClasses().subscribe(classes => {
    //   this.classes = classes;
    //   for (var i=0; i < this.classes.length; i++) {
    //     this.classCodes.push(this.classes[i].code);
    //   }
    // });

    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;      
    })
  }

  onSubmit({value, valid}: {value: Subclass, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add id to Subclass, then update
      value.id = this.id;
      this.setupService.updateSubclass(value);
      this.flashMessage.show('New Subclass Added', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['/subclass']);
    }
  }

  // Set the classCode and productCode
  // setClassCode(e) {
  //   var index = this.classCodes.indexOf(e);
  //   this.classCode = this.classCode[index].classCode; 
  // }

}
