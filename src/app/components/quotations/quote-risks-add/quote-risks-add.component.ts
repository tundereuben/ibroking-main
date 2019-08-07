import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params  } from '@angular/router';

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
// quoteId: string;
quoteProductCode: number;
qrCode: number; // fetch all quote risk limits & use the most recent
quoteProduct: any; // Fetch from session storage
subclasses: Subclass[] = []; riskSubclass = null;
covertypes: Covertype[] = []; riskCovertype = null;
quoteRisks: QuoteRisk[] = [];

quoteRisk: QuoteRisk = {
  qrCode: 0,
  qrQuotCode: 0,
  qrQuotNo: '',
  qrPropertyId: '',
  qrItemDesc: '',
  qrSclCode: 0,
  qrQpCode: 0,
  qrCovtCode: 0,
  qrClntCode: 0,
  qrWefDate: null,
  qrWetDate: null
}

@ViewChild('quoteRiskForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get quoteProduct code from path:id and fetch quoteProduct info
    this.quoteProductCode = this.route.snapshot.params['id'];
    this.quotationService.getQuoteProduct(this.quoteProductCode).subscribe(quoteProduct => {
      this.quoteProduct = quoteProduct;
      console.log(this.quoteProduct);
    })
    


    // get quoteCode from session variable
    // this.isAdd = JSON.parse(sessionStorage.getItem("isAdd"));
    // this.quoteProduct = JSON.parse(sessionStorage.getItem("quoteProduct"));
    // this.quoteRisk.qrWefDate = this.quoteProduct.qpWefDate;
    // this.quoteRisk.qrWetDate = this.quoteProduct.qpWetDate;
    // this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));
    // this.quoteProductCode = this.quoteProduct.code;
    // console.log(this.quoteProduct);
        
    this.setupService.getSubclasses().subscribe(subclasses => {
      this.subclasses = subclasses;
      // console.log(this.subclasses);
    });

    this.setupService.getCovertypes().subscribe(covertypes => {
      this.covertypes = covertypes;
      // console.log(this.covertypes);
    });

    // Fetch existing risks, get last risk number, then generate new risk number
    this.quotationService.getQuoteRisks().subscribe(quoteRisks => {
      this.quoteRisks = quoteRisks; 
      this.qrCode = this.quoteRisks[0].qrCode + 1;
    });
  }

  onSubmit({value, valid}: {value: QuoteRisk, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Risk
      value.qrCode = this.qrCode;
      value.qrQuotCode = this.quoteProduct.qpQuotCode;
      value.qrQuotNo = this.quoteProduct.qpQuotNo; 
      value.qrQpCode = this.quoteProduct.qpCode;
      this.quotationService.addQuoteRisk(value)
      .subscribe(response => 
        err => console.log(err));
      
      // save quoteRisk in session variable
      // sessionStorage.setItem("quoteRisk", JSON.stringify(value));
      this.router.navigate([`/quote-risk-limits-add/${value.qrCode}`]);
    }
  }

}
