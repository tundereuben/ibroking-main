import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { QuoteRiskLimit } from '../../../models/QuoteRiskLimit';
import { Section } from '../../../models/Section';

@Component({
  selector: 'app-quote-risk-limits-edit',
  templateUrl: './quote-risk-limits-edit.component.html',
  styleUrls: ['./quote-risk-limits-edit.component.css']
})
export class QuoteRiskLimitsEditComponent implements OnInit {
  quoteRiskCode: number;
  quoteId: string;
  sections: Section[] = []; 
  riskSectionCode ;
  isAddToRisk: boolean;

  // For premium computation
  limitAmount: number; 
  premiumRate: number;
  rateDivisionFactor: number;
  premiumAmount: number;

  quoteRiskLimits: QuoteRiskLimit[] = [];
  id:string;
  quoteRiskLimit: QuoteRiskLimit = {
    id: '',
    code: 0,
    quoteCode: 0,
    quoteRiskCode: 0,
    sectionCode: 0,
    limitAmount: 0,
    premiumRate: 0,
    premiumAmount: 0,
    rateDivisionFactor: 0,
    riskSectionCode: 0,
  };


  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get id from url and fetch quotation 
    this.id = this.route.snapshot.params['id']; 
    this.quotationService.getQuoteRiskLimit(this.id).subscribe(quoteRiskLimit => {
      this.quoteRiskLimit = quoteRiskLimit;
      this.limitAmount = quoteRiskLimit.limitAmount;
      this.premiumRate = quoteRiskLimit.premiumRate;
      this.rateDivisionFactor = quoteRiskLimit.rateDivisionFactor;
    });
    

    this.riskSectionCode = this.quoteRiskLimit.riskSectionCode;
    
    this.setupService.getSections().subscribe(sections => {
      this.sections = sections;
    });
  };

   //****PREMIUM COMPUTATION ****/
   getLimitAmount(event) {
    this.limitAmount = parseFloat(event.target.value);
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
    this.premiumAmount = this.limitAmount * this.premiumRate / this.rateDivisionFactor; 
    this.quoteRiskLimit.premiumAmount = this.premiumAmount;
    console.log(this.premiumAmount);
  }  
  //****PREMIUM COMPUTATION ENDS ****/

  onSubmit({value, valid}: {value: QuoteRiskLimit, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Update Quote
      value.id = this.id;
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
