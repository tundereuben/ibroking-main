import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Quotation } from '../../../models/Quotation'; 

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.css']
})
export class QuotationAddComponent implements OnInit {
  quotations: Quotation[];
  quoteCode = 0;
  quotCoverFrom: any;
  quotCoverTo: any;
  back: boolean  // Check when back button is clicked.

  quotation: Quotation = {
    quotCode: 0,
    quotNo: '',
    quotClntCode: 0,
    quotAgntCode: 0,
    quotSource: '',
    quotBranch: '',
    quotCurSymbol: '',
    quotCoverFrom: null,
    quotCoverTo: null,
    quotPaymentFrequency: '',
    quotDate: null,
    quotUpdated: null
  };

  clients: any[]  = [];  client = null
  agent = null; 

  source = null; 
  sources: any[] = ['Direct', 'Walk-In', 'Referred']; 

  quotBranch = null;
  quotBranches: any[] = ['LAG', 'ABJ', 'KAD', 'KAN' ]; 

  currencies: any[] = [];      currency = null;
  quotPaymentFrequencies: string[] = ['Anually', 'Semi-anually', 'Quarterly'];   quotPaymentFrequency = null;

  @ViewChild('quotationForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {

    // Fetch existing clients
    this.setupService.getClients().subscribe(clients => {
      this.clients = clients;   
    }); 

    this.quotationService.getQuotations().subscribe(quotations => {
      this.quotations = quotations; 
      this.quoteCode = quotations[0].quotCode;
    });
    
    // fetch currencies from API
    this.currencies = this.quotationService.currencies;     
  }

  computeCoverTo(event){
    var coverFrom = new Date(event.target.value); coverFrom.setFullYear(coverFrom.getFullYear() + 1);
    let yy = coverFrom.getFullYear();
    let mm = padNumber(coverFrom.getMonth() + 1);
    let dd = padNumber(coverFrom.getDate());

    function padNumber(n) {
      return (n < 10 ) ? ("0" + n) : n;
    }
    this.quotCoverTo = yy + "-" + mm + "-" + dd;
  }

  onSubmit({value, valid}: {value: Quotation, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {

      // Add New Quote number
      // var randomNumber = Math.floor(Math.random() * 1000000000); // Generate a random number for quote_number btw 0 and 1,000,000,000
      value.quotCode = this.quoteCode + 1;
      value.quotNo = `QT19${value.quotCode}${value.quotBranch}`;
      
      this.quotationService.addQuotation(value)
      .subscribe(response => 
                  // console.log(response), 
                  err => console.log(err));

      this.router.navigate([`/quote-products-add/${value.quotCode}`]);

    }
  }

}
