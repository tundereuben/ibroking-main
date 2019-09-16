import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute} from '@angular/router';

import { QuoteRiskLimit } from '../../../models/QuoteRiskLimit';
import { Section } from '../../../models/Section';

@Component({
  selector: 'app-quote-risk-limits-add',
  templateUrl: './quote-risk-limits-add.component.html',
  styleUrls: ['./quote-risk-limits-add.component.css']
})
export class QuoteRiskLimitsAddComponent implements OnInit {

  isAdd: boolean;
  qrCode: number;
  qrlCode: number;
  quoteRisk: any;
  quoteId: string;
  sections: Section[] = []; qrlSectCode = null;

  // For premium computation
  limitAmount: number; 
  premiumRate: number;
  rateDivisionFactor: number;
  premiumAmount: number;
  commissionAmount: number;

  qrlLimitAmt: number;
  qrlRateDivFactor: number;
  isAddToRisk: boolean;

  quoteRiskLimits: QuoteRiskLimit[] = [];
  quoteRiskLimit: QuoteRiskLimit = {
    
  };

  @ViewChild('quoteRiskLimitForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get quotation code from path:id and fetch quotation info
    this.qrCode = this.route.snapshot.params['id'];
    this.quotationService.getQuoteRisk(this.qrCode).subscribe(quoteRisk => {
      this.quoteRisk = quoteRisk;
    });
    
    // this.quoteRisk = JSON.parse(sessionStorage.getItem("quoteRisk"));
    // console.log(this.quoteRisk);
    // this.isAdd = JSON.parse(sessionStorage.getItem("isAdd"));

    this.setupService.getSections().subscribe(sections => {
      this.sections = sections;
    });

    // Fetch existing riskLimit, get last riskLimit number, then generate new riskLimit number
    this.quotationService.getQuoteRiskLimits().subscribe(quoteRiskLimits => {
      this.quoteRiskLimits = quoteRiskLimits; 
      // console.log(this.quoteRiskLimits[0]);
      this.qrlCode = this.quoteRiskLimits[0].qrlCode + 1; 
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
      // var quoteProduct = JSON.parse(sessionStorage.getItem("quoteProduct"));
      // var quoteRisk = JSON.parse(sessionStorage.getItem("quoteRisk"));
      // var quotation = JSON.parse(sessionStorage.getItem("quotation"));
      // console.log(quotation);


      // Add New Quote Risk Limit
      value.qrlCode = this.qrlCode;
      value.qrlQrCode = this.qrCode;
      value.qrlQrQuotCode = this.quoteRisk.qrQuotCode;
      value.qrlQpCode = this.quoteRisk.qrQpCode; 
      value.qrlQpProCode = this.quoteRisk.qpQpCode;     
      value.qrlPremAmt = this.premiumAmount;
      value.qrlClntCode = this.quoteRisk.qrClntCode;
      // value.commissionAmount = this.commissionAmount;
      value.qrlPremRate = this.premiumRate;
      
      this.quotationService.addQuoteRiskLimit(value)
      .subscribe(response => 
        // console.log(response), 
        err => console.log(err));

      // update quotation information 
      // var postData = {
      //   id: this.quoteId,
      //   premiumAmount: this.premiumAmount,
      //   totalPropertyValue: this.limitAmount,
      //   commissionAmount: this.commissionAmount
      // };
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
