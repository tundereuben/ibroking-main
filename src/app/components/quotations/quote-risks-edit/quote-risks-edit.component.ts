import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { QuoteRisk } from '../../../models/QuoteRisk';
import { Subclass } from '../../../models/Subclass';
import { Covertype } from '../../../models/Covertype';

 import { Location } from '@angular/common';

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

  id: number;
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

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    //  // Get id from url and fetch quotation 
     this.id = this.route.snapshot.params['id'];
    //  this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));
     this.quotationService.getQuoteRisk(this.id).subscribe(quoteRisk => {
       this.quoteRisk = quoteRisk;
      //  console.log(quoteRisk);
     });

    //  this.riskSubclass = this.quoteRisk.subclassCode;
    //  this.riskCovertype = this.quoteRisk.coverTypeCode


     // get quoteCode from session variable
     this.isAdd = JSON.parse(sessionStorage.getItem("isAdd")); 
     this.quoteId = JSON.parse(sessionStorage.getItem("quoteId"));
     this.quoteProductCode = parseInt(sessionStorage.getItem("quoteProductCode"));
     // console.log(sessionStorage.getItem("quoteProductCode"))
         
     this.setupService.getSubclasses().subscribe(subclasses => {
       this.subclasses = subclasses;
      //  console.log(this.subclasses);
     });
 
     this.setupService.getCovertypes().subscribe(covertypes => {
       this.covertypes = covertypes;
      //  console.log(this.covertypes);
     });
  }

  onSubmit({value, valid}: {value: QuoteRisk, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // Add qrCode to Risk and Update Risk
      value.qrCode = this.id;
      value.qrQuotCode = this.quoteRisk.qrQuotCode;
      value.qrQuotNo = this.quoteRisk.qrQuotNo;
      value.qrClntCode = this.quoteRisk.qrClntCode;
      this.quotationService.updateQuoteRisk(value)
      .subscribe(response => 
        // console.log(response), 
        err => console.log(err));
      this.flashMessage.show('Quote Risk updated Successfully!', {cssClass: 'alert-success', timeout:4000});
      // this.router.navigate([`/quotation-details/${this.quoteId}`]);
      this.goBack();
    }
  }

  goBack(){
    this.location.back();
  }

}
