import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Section } from '../../../models/Section';
import { Covertype } from '../../../models/Covertype';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})
export class SectionEditComponent implements OnInit {
  covertypes: Covertype[];

 

  id: string;
  section: Section = {
    id: '',
    name: '',
    code: '',
    description: '',
    type: '',
    premiumRate: 0,
    rateDivisionFactor: 0
  }

   // Initialize ARRAYS & VARIABLES for classCode & productCode => For Dropdowns
   covertypeCodes: string[] = []; covertypeCode = this.section.covertypeCode ;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getSection(this.id).subscribe(section => {
      this.section = section;
    });

    this.setupService.getCovertypes().subscribe(covertypes => {
      this.covertypes = covertypes;
      for (var i=0; i < this.covertypes.length; i++) {
        this.covertypeCodes.push(this.covertypes[i].code);
      }
    });
  }

  onSubmit({value, valid}: {value: Section, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // Add id to client
      value.id = this.id;
      // Update client
      this.setupService.updateSection(value);
      this.flashMessage.show('Section updated', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/section-details/'+this.id]);
    }
  }

}
