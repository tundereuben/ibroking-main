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
  isAdd: boolean;
  quoteRiskCode: number;
  quoteRisk: any;
  quoteId: string;
  sections: Section[] = []; riskSectionCode = null;

  // For premium computation
  limitAmount: number; 
  premiumRate: number;
  rateDivisionFactor: number;
  premiumAmount: number;
  commissionAmount: number;

  quoteRiskLimits: QuoteRiskLimit[] = [];
  quoteRiskLimit: QuoteRiskLimit = {
    
  };

  @ViewChild('quoteRiskLimitForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.quoteRiskCode = parseInt(JSON.parse(sessionStorage.getItem("quoteRiskCode")));
    this.quoteRisk = JSON.parse(sessionStorage.getItem("quoteRisk"));
    this.quoteRiskCode = this.quoteRisk.code;
    // console.log(this.quoteRisk);
    this.isAdd = JSON.parse(sessionStorage.getItem("isAdd"));
    this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));

    this.setupService.getSections().subscribe(sections => {
      this.sections = sections;
    });

    // Fetch existing riskLimit, get last riskLimit number, then generate new riskLimit number
    this.quotationService.getQuoteRiskLimits().subscribe(quoteRiskLimits => {
      // this.quoteRiskLimits = quoteRiskLimits; 
      // for(var i=0; i < quoteRiskLimits.length; i++){
      //   if(quoteRiskLimits[i].code > this.quoteRiskLimit.code ) this.quoteRiskLimit.code = quoteRiskLimits[i].code;
      // }
      // this.quoteRiskLimit.code += 1;
    });
  };

  //****COMPUTATIONS: premium, commission ****/
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
      this.computeCommission();
    } 
  }
  
  computeCommission(){
    this.commissionAmount = this.premiumAmount * 0.25;
  }
  //****PREMIUM COMPUTATION ENDS ****/
  

  onSubmit({value, valid}: {value: QuoteRiskLimit, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      
      // fetch session variables
      var quoteInfo = JSON.parse(sessionStorage.getItem("quoteInfo"));
      var quoteProduct = JSON.parse(sessionStorage.getItem("quoteProduct"));
      var quoteRisk = JSON.parse(sessionStorage.getItem("quoteRisk"));
      console.log(quoteInfo, quoteProduct, quoteRisk);


      // Add New Quote
      // value.quoteCode = this.quoteCode;
      // value.quoteRiskCode = this.quoteRiskCode;
      // value.premiumAmount = this.premiumAmount;
      // value.commissionAmount = this.commissionAmount;
      // value.code = this.quoteRiskLimit.code;
      // this.quotationService.newQuoteRiskLimit(value);

      // update quotation information 
      var postData = {
        id: this.quoteId,
        premiumAmount: this.premiumAmount,
        totalPropertyValue: this.limitAmount,
        commissionAmount: this.commissionAmount
      };
      // console.log(postData)
      // this.quotationService.updateQuotation(postData);

      // save quoteRisk in session variable & route
      sessionStorage.setItem("quoteRiskLimitValue", JSON.stringify(value));
      if(this.isAdd){
        this.router.navigate([`/quotation-details/${this.quoteId}`])
      } else {
        this.router.navigate(['/quotations']);
      }
      
      // console.log(value);
    }
  }

} 
