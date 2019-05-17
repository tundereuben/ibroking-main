import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Clause } from '../../../models/Clause';
import { Subclass } from '../../../models/Subclass';

@Component({
  selector: 'app-clause-edit',
  templateUrl: './clause-edit.component.html',
  styleUrls: ['./clause-edit.component.css']
})
export class ClauseEditComponent implements OnInit {
  subclasses: Subclass[];

  id: number;
  clause: Clause = {}

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getClause(this.id).subscribe(clause => {
      this.clause = clause;
    });

    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses; 
      // console.log(this.subclasses)

      // for (var i=0; i < this.subclasses.length; i++) {
      //   this.subclassCodes.push(this.subclasses[i].code);
      // }
      
    })
  }

  // onSubmit({value, valid}: {value: Clause, valid: boolean}){
  //   if(!valid) {
  //     this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
  //   } else {
  //     this.setupService.updateClause(value);
  //     this.flashMessage.show('Clause updated', {cssClass: 'alert-success', timeout: 4000});
  //     this.router.navigate(['/clauses']);
  //   }
  // }

  onSubmit(value): void {
    this.setupService.updateClause(value)
      .subscribe(() => {
        this.flashMessage.show('Clause Updated', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/clauses']);
      })
  }

}
