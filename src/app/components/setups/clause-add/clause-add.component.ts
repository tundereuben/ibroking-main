import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Clause } from '../../../models/Clause';
import { Subclass } from '../../../models/Subclass';

@Component({
  selector: 'app-clause-add',
  templateUrl: './clause-add.component.html',
  styleUrls: ['./clause-add.component.css']
})
export class ClauseAddComponent implements OnInit {
  clauses: Clause[];
  subclasses: Subclass[];

  id: string;
  clause: Clause = {}

  @ViewChild('clauseForm', {static: false }) form: any;

  // Set dropdown for classCode
  subclassCodes: string[] =[] ; subclassCode = null;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.setupService.getClauses().subscribe(clauses => {
      this.clauses = clauses;
    });
    
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;

      // for (var i=0; i < this.subclasses.length; i++) {
      //   this.subclassCodes.push(this.subclasses[i].code);
      // }
    })
  }

  onSubmit({value, valid} : {value: Clause, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      const sub =  this.setupService.addClause(this.clause)
      .subscribe(data => {
        this.clause = data
        this.flashMessage.show('New Clause added', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/clauses']);
      });
    }
  }

}
