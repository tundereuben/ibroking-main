import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { Router, RouterStateSnapshot } from '@angular/router';
// import { MomentModule } from 'angular2-moment';

import { Quotation } from '../../../models/Quotation'; 
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.css']
})
export class QuotationAddComponent implements OnInit {
  quotations: Quotation[] = [];
  code = 0;
  coverFrom: any;
  coverTo: any;
  back: boolean  // Check when back button is clicked.

  quotation: Quotation = {
    quotAuthorisedBy: '',
    quotAuthorisedDt: null,
    quotBrnCode: 0,
    quotCancelReason: '',
    quotClntCode: 0,
    quotClntType: '',
    quotCode: 0,
    quotCommAmt: 0,
    quotConfirmed: '',
    quotConfirmedBy: '',
    quotConfirmedDt: null,
    quotCoverFrom: null,
    quotCoverTo: null,
    quotCurCode: 0,
    quotCurSymbol: '',
    quotDate: null,
    quotExpiryDate: null,
    quotFreqOfPayment: '',
    quotNo: 0,
    quotPremium: 0,
    quotPreparedBy: '',
    quotPreparedDt: null,
    quotReadyBy: '',
    quotReadyDate: null,
    quotRevised: '',
    quotStatus: '',
    quotTotPropertyVal: 0
  };

  clients: any[]  = [];  client = null
  agent = null; 

  source = null; 
  sources: any[] = ['Direct', 'Walk-In', 'Referred']; 

  branch = null;
  branches: any[] = ['Lagos', 'Abuja', 'Kaduna', 'Kano' ]; 

  currencies: any[] = [];      currency = null;
  paymentFrequencies: string[] = ['Anually', 'Semi-anually', 'Quarterly'];   paymentFrequency = null;

  usersUrl = 'https://jsonplaceholder.typicode.com/users';
  currencyUrl = 'https://restcountries.eu/rest/v2/currency/cop';

  @ViewChild('quotationForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private router: Router
  ) { }

  ngOnInit() {
    // fetch clients from API
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
    this.clients = users; 

    // fetch currencies from API
    var currencies = this.quotationService.currencies;
    var size = 0, key; var code = 0;
    for (key in currencies) {
      this.currencies.push({
        "code": code++,
        "name": currencies[key].name,
        "symbol": currencies[key].symbol
      });
    }

    // Fetch existing quotes, get last quote number, then generate new quote number
    this.quotationService.getQuotations().subscribe(quotations => {
      this.quotations = quotations;
      // for(var i=0; i < quotations.length; i++){
      //   if(quotations[i].code > this.code ) this.code = quotations[i].code;
      // }
      // this.code += 1;
    });   

    //  If the back button was clicked.
    this.back = JSON.parse(sessionStorage.getItem("back"));
    if(this.back) {
      // this.quotation = JSON.parse(sessionStorage.getItem("quoteInfo"));
      // this.client = this.quotation.client;
      // this.agent = this.quotation.agent;
      // this.source = this.quotation.source;
      // this.branch = this.quotation.branch;
      // this.currency = this.quotation.currency;
      // this.coverFrom = this.quotation.coverFrom;
      // this.coverTo = this.quotation.coverTo;
      // this.paymentFrequency = this.quotation.paymentFrequency;
      // console.log(this.quotation, this.quotation.id);
    }
    
  }

  computeCoverTo(event){
    var coverFrom = new Date(event.target.value); coverFrom.setFullYear(coverFrom.getFullYear() + 1);
    let yy = coverFrom.getFullYear();
    let mm = padNumber(coverFrom.getMonth() + 1);
    let dd = padNumber(coverFrom.getDate());

    function padNumber(n) {
      return (n < 10 ) ? ("0" + n) : n;
    }
    this.coverTo = yy + "-" + mm + "-" + dd;
  }

  onSubmit({value, valid}: {value: Quotation, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // // Add New Quote
      // value.code = this.code;
      // this.quotationService.newQuotation(value);

      // save values in a session variable, then re-route to quote-products
      sessionStorage.setItem("quoteInfo", JSON.stringify(value));
      this.router.navigate(['/quote-products-add']);

      //  Get id of quotation
      this.quotationService.getQuotations().subscribe(quotations => {
        // this.quotations = quotations;
        // this.quotations.forEach((quotation) => {
        //   if(quotation.code == value.code) {
        //     sessionStorage.setItem("quoteId", JSON.stringify(quotation.id));
        //   }
        // })
      });
    }
  }

}
