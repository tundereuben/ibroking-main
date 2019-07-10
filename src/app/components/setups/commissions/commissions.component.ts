import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Commission } from '../../../models/Commission';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
  commissions: Commission[];
  commission: Commission = {};
  calcOn: string;
  calcOns: string[];
  commType: string;
  commTypes: string[];

  @ViewChild('loadingForm', {static: false }) form: any;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Set discount type and calculated on
    this.calcOn = null;
    this.calcOns = ['Premium', 'Sum Insured'];
    this.commType = null;
    this.commTypes = ['Rate', 'Value'];
  }

}
