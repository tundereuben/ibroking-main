import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Clause } from '../../../models/Clause'

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.css']
})
export class ClausesComponent implements OnInit {
  clauses: Clause[];
  clause: Clause = {}

  @ViewChild('clauseForm', {static: false }) form: any;
  
  constructor(
    private setupService: SetupService,
    private router: Router, 
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    this.setupService.getClauses().subscribe(clauses => {
      this.clauses = clauses;
    })
  }

  onSubmit({value, valid} : {value: Clause, valid: boolean}){
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      const sub =  this.setupService.addClause(value)
      .subscribe(clause => {
        this.clauses.push(clause)
        this.flashMessage.show('New Clause added', {
          cssClass: 'alert-success', timeout: 3000
        });
        this.router.navigate(['/clauses']);
      });
    }
  }

  delete(clause: Clause)  : void {
    if(confirm("Are you sure?")) {
      this.setupService.deleteClause(clause)
    .subscribe(data => {
      this.clauses = this.clauses.filter(c => c !== clause);
    })
    }
  }
}
