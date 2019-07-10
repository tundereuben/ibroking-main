import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Loading } from '../../../models/Loading';

@Component({
  selector: 'app-loadings',
  templateUrl: './loadings.component.html',
  styleUrls: ['./loadings.component.css']
})
export class LoadingsComponent implements OnInit {
  loadings: Loading[];
  loading: Loading = {};
  calcOn: string;
  calcOns: string[];
  loadType: string;
  loadTypes: string[];

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
    this.loadType = null;
    this.loadTypes = ['Rate', 'Value'];
  }

}
