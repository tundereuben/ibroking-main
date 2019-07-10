import { Component, OnInit, ViewChild } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Discount } from '../../../models/Discount';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  dscount: Discount[];
  benefit: Discount = {};
  calcOn: string;
  calcOns: string[];
  dsctType: string;
  dsctTypes: string[];

  @ViewChild('discountForm', {static: false }) form: any;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Set discount type and calculated on
    this.calcOn = null;
    this.calcOns = ['Premium', 'Sum Insured'];
    this.dsctType = null;
    this.dsctTypes = ['Rate', 'Value'];
  }

}
