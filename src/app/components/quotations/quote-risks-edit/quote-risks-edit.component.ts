import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { QuoteRisk } from '../../../models/QuoteRisk';
import { Subclass } from '../../../models/Subclass';
import { Covertype } from '../../../models/Covertype';

@Component({
  selector: 'app-quote-risks-edit',
  templateUrl: './quote-risks-edit.component.html',
  styleUrls: ['./quote-risks-edit.component.css']
})
export class QuoteRisksEditComponent implements OnInit {
  isAdd: boolean;
  quoteId: string;
  quoteProductCode: number;
  subclasses: Subclass[] = []; riskSubclass = null;
  covertypes: Covertype[] = []; riskCovertype = null;
  quoteRisks: QuoteRisk[] = [];

  id: string;
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
     this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));
     this.quotationService.getQuoteRisk(this.id).subscribe(quoteRisk => {
       this.quoteRisk = quoteRisk;
      //  console.log(quoteRisk);
     });

     this.riskSubclass = this.quoteRisk.subclassCode;
     this.riskCovertype = this.quoteRisk.coverTypeCode


     // get quoteCode from session variable
     this.isAdd = JSON.parse(sessionStorage.getItem("isAdd")); 
     this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));
     this.quoteProductCode = parseInt(sessionStorage.getItem("quoteProductCode"));
     // console.log(sessionStorage.getItem("quoteProductCode"))
         
     this.setupService.getSubclasses().subscribe(subclasses => {
       this.subclasses = subclasses;
     });
 
     this.setupService.getCovertypes().subscribe(covertypes => {
       this.covertypes = covertypes;
     });
  }

  onSubmit({value, valid}: {value: QuoteRisk, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // Add id to Risk and Update Risk
      value.id = this.id;
      this.quotationService.updateQuoteRisk(value);
      this.flashMessage.show('Quote Risk updated Successfully!', {cssClass: 'alert-success', timeout:4000});
      // save values in a session variable, then re-route to quote-products
      // sessionStorage.setItem("quoteCode", JSON.stringify(value.code));
      this.router.navigate([`/quotation-details/${this.quoteId}`]);
    }
  }

}
