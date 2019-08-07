import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Quotation } from '../../../models/Quotation'; 
import { stringify } from 'querystring'; 

@Component({
  selector: 'app-quotation-edit',
  templateUrl: './quotation-edit.component.html',
  styleUrls: ['./quotation-edit.component.css']
})
export class QuotationEditComponent implements OnInit {
  quotations: Quotation[] = [];
  quoteCode: number;
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

  quotClntCodes: any[]  = []; quotClntCode; 
  // agentCode = this.quotation.agentCode; 
  // code = this.quotation.code;

  // source = this.quotation.source; 
  sources: any[] = ['Direct', 'Walk-In', 'Referred']; 

  // branch = this.quotation.branch;
  branches: any[] = ['Lagos', 'Abuja', 'Kaduna', 'Kano' ]; 

  currencies: any[] = [];      
  // // currencyCode = this.quotation.currency.code; 
  // // currencySymbol = this.quotation.currency.symbol; 
  // currency = this.quotation.currency;

  paymentFrequencies: string[] = ['Anually', 'Semi-anually', 'Quarterly'];   
  // paymentFrequency = this.quotation.paymentFrequency;

  usersUrl = 'https://jsonplaceholder.typicode.com/users';
  currencyUrl = 'https://restcountries.eu/rest/v2/currency/cop';

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get id from url and fetch quotation 
    this.quoteCode = this.route.snapshot.params['id'];
    this.quotationService.getQuotation(this.quoteCode).subscribe(quotation => {
      this.quotation = quotation;
      var coverFrom = quotation.quotCoverFrom;

      // this.client = this.quotation.client;
    });

    // fetch clients from API, assign clientCode
    var users = [];
    fetch(this.usersUrl)
    .then((resp) => resp.json())
    .then(function(data){
      for(var i = 0; i < data.length; i++){
        users.push({
          "code": i,
          "name": data[i].name,
          "email": data[i].email,
          "phone": data[i].phone
        });  
      }
    });
    this.quotClntCodes = users; 

    // fetch currencies from API
    var currencies = this.quotationService.currencies;
    // console.log(currencies)
    // var size = 0, key; var code = 0;
    // for (key in currencies) {
    //   this.currencies.push({
    //     "code": code++,
    //     "shtDesc": currencies[key].code,
    //     "name": currencies[key].name,
    //     "symbol": currencies[key].symbol
    //   });
    // }
  } 

  onSubmit({value, valid}: {value: Quotation, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 3000});
    } else {
      // Add id to Quote and Update Quote
      value.quotCode = this.quoteCode;
      this.quotationService.updateQuotation(value)
      .subscribe(response => 
        // console.log(response), 
        err => console.log(err));
      this.flashMessage.show('Quote updated Successfully!', {cssClass: 'alert-success', timeout:4000});
      this.router.navigate([`/quotation-details/${this.quoteCode}`]);
    }
  }
}
