import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';

import { Clause } from '../../../models/Clause'

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.css']
})
export class ClausesComponent implements OnInit {
  clauses: Clause[];
  
  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getClauses().subscribe(clauses => {
      this.clauses = clauses;
    })
  }

}
