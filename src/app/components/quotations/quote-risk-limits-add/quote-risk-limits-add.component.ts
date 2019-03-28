import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { QuoteRiskLimit } from '../../../models/QuoteRiskLimit';
import { Section } from '../../../models/Section';

@Component({
  selector: 'app-quote-risk-limits-add',
  templateUrl: './quote-risk-limits-add.component.html',
  styleUrls: ['./quote-risk-limits-add.component.css']
})
export class QuoteRiskLimitsAddComponent implements OnInit {
  // quoteRiskSectionValue: any;
  // quoteCode: number;
  isAddToRisk: boolean;
  quoteRiskCode: number;
  quoteId: string;
  sections: Section[] = []; riskSectionCode = null;

  // For premium computation
  limitAmount: number; 
  premiumRate: number;
  rateDivisionFactor: number;
  premiumAmount: number;

  quoteRiskLimits: QuoteRiskLimit[] = [];
  quoteRiskLimit: QuoteRiskLimit = {
    id: '',
    code: 0,
    quoteCode: 0,
    quoteRiskCode: 0,
    sectionCode: 0,
    limitAmount: 0,
    premiumRate: 0,
    premiumAmount: 0,
    rateDivisionFactor: 0
  };

  @ViewChild('quoteRiskLimitForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.quoteRiskCode = parseInt(JSON.parse(sessionStorage.getItem("quoteRiskCode")));
    this.isAddToRisk = JSON.parse(sessionStorage.getItem("isAddToRisk"));
    this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));

    this.setupService.getSections().subscribe(sections => {
      this.sections = sections;
    });

    // Fetch existing riskLimit, get last riskLimit number, then generate new riskLimit number
    this.quotationService.getQuoteRiskLimits().subscribe(quoteRiskLimits => {
      this.quoteRiskLimits = quoteRiskLimits; 
      for(var i=0; i < quoteRiskLimits.length; i++){
        if(quoteRiskLimits[i].code > this.quoteRiskLimit.code ) this.quoteRiskLimit.code = quoteRiskLimits[i].code;
      }
      this.quoteRiskLimit.code += 1;
    });
  };

  //****PREMIUM COMPUTATION ****/
  getLimitAmount(event) {
    this.limitAmount = parseFloat(event);
    this.computePremium()
  };

  getPremiumRate(event) {
    this.premiumRate = event;
    this.computePremium()
  };

  getRateDivisionFactor(event) {
    this.rateDivisionFactor = event;
    this.computePremium()
  };

  computePremium() {
    if(this.limitAmount != null && this.premiumRate != null && this.rateDivisionFactor != null){
      this.premiumAmount = this.limitAmount * this.premiumRate / this.rateDivisionFactor
      // console.log(this.premiumAmount)
    } 
  }   //****PREMIUM COMPUTATION ENDS ****/
  

  onSubmit({value, valid}: {value: QuoteRiskLimit, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Quote
      // value.quoteCode = this.quoteCode;
      value.quoteRiskCode = this.quoteRiskCode;
      value.premiumAmount = this.premiumAmount;
      value.code = this.quoteRiskLimit.code;
      this.quotationService.newQuoteRiskLimit(value);
      // save quoteRisk in session variable & route
      sessionStorage.setItem("quoteRiskLimitValue", JSON.stringify(value));
      if(this.isAddToRisk){
        this.router.navigate([`/quotation-details/${this.quoteId}`])
      } else {
        this.router.navigate(['/quotations']);
      }
      
      // console.log(value);
    }
  }

}
