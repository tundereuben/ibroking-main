import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { QuoteRisk } from '../../../models/QuoteRisk';
import { Subclass } from '../../../models/Subclass';
import { Covertype } from '../../../models/Covertype';

@Component({
  selector: 'app-quote-risks-add',
  templateUrl: './quote-risks-add.component.html',
  styleUrls: ['./quote-risks-add.component.css']
})
export class QuoteRisksAddComponent implements OnInit {
// quoteCode: string;
isAdd: boolean;
quoteId: string;
quoteProductCode: number;
quoteProduct: any; // Fetch from session storage
subclasses: Subclass[] = []; riskSubclass = null;
covertypes: Covertype[] = []; riskCovertype = null;
quoteRisks: QuoteRisk[] = [];

quoteRisk: QuoteRisk = {
  id: '',
  code: 0,
  name: '',
  quoteCode: 0,
  quoteNo: '',
  riskId: '',
  riskDescription: '',
  value: '',
  subclassCode: 0,
  quoteProductCode: 0,
  coverTypeCode: 0,
  premium: 0,
  coverFrom: '',
  coverTo: '',
  clientCode: 0,
  clientType: '',
  annualPremium: 0,
}

@ViewChild('quoteRiskForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    // get quoteCode from session variable
    this.isAdd = JSON.parse(sessionStorage.getItem("isAdd"));
    this.quoteProduct = JSON.parse(sessionStorage.getItem("quoteProduct"));
    this.quoteRisk.coverFrom = this.quoteProduct.coverFrom;
    this.quoteRisk.coverTo = this.quoteProduct.coverTo;
    console.log(this.quoteProduct.coverFrom, this.quoteProduct.coverTo);
    this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));
    this.quoteProductCode =this.quoteProduct.code;
    console.log(this.quoteProduct);
        
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;
    });

    this.setupService.getCovertypes().subscribe(covertypes => {
      this.covertypes = covertypes;
    });

    // Fetch existing risks, get last risk number, then generate new risk number
    this.quotationService.getQuoteRisks().subscribe(quoteRisks => {
      this.quoteRisks = quoteRisks; 
      for(var i=0; i < quoteRisks.length; i++){
        if(quoteRisks[i].code > this.quoteRisk.code ) this.quoteRisk.code = quoteRisks[i].code;
      }
      this.quoteRisk.code += 1;
    });
  }

  onSubmit({value, valid}: {value: QuoteRisk, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Risk
      // value.quoteCode = parseInt(this.quoteCode);
      value.quoteProductCode = this.quoteProductCode; 
      value.code = this.quoteRisk.code;
      this.quotationService.newQuoteRisk(value);
      // save quoteRisk in session variable
      // sessionStorage.setItem("quoteRiskCode", JSON.stringify(value.code));
      sessionStorage.setItem("quoteRisk", JSON.stringify(value));
      this.router.navigate(['/quote-risk-limits-add']);
    }
  }

}
