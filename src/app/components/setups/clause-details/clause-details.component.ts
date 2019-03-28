import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Clause } from '../../../models/Clause';

@Component({
  selector: 'app-clause-details',
  templateUrl: './clause-details.component.html',
  styleUrls: ['./clause-details.component.css']
})
export class ClauseDetailsComponent implements OnInit {
  id: string;
  clause: Clause;


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
    })
  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.setupService.deleteClause(this.clause);
      this.flashMessage.show('Clause removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/clauses']);
    }
  }

} 
