import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Benefit } from '../../../models/Benefit'

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {
  benefits: Benefit[];
  benefit: Benefit = {};
  calcOn: string;
  calcOns: string[];

  @ViewChild('benefitForm', {static: false }) form: any;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

    // this.setupService.getBenefits().subscribe(benefits => {
    //   this.benefits = benefits;
    //   console.log(this.benefits);
    // });

    this.calcOn = null;
    this.calcOns = ['Premium', 'Sum Insured'];
  }

}
