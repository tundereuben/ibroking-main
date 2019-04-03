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
  id: string;
  quotation: Quotation = { 
    id: '',
    code: 0,
    quoteNo: 0,
    client: {}, // remove clientCode & clientName
    clientCode: 0,
    clientName: '',
    agentCode: 0,
    sourceCode: 0,
    branchCode: 0,
    currency: {},
    coverFrom: '',
    coverTo: '',
    paymentFrequency: '',
    totalPropertyValue: 0,
    status: '',
    expiryDate: '',
    ok: '',
    premium: 0,
    commissionAmount: 0,
    // clientType: '',
  };

  clients: any[]  = []; client; 
  agentCode = this.quotation.agentCode; 
  // code = this.quotation.code;

  sourceCode = this.quotation.sourceCode; 
  sources: any[] = [
    {'code': 0, 'name': 'Direct'},
    {'code': 1, 'name': 'Walk-In'},
    {'code': 2, 'name': 'Referred'}
  ]; 

  branchCode = this.quotation.branchCode;
  branches: any[] = [
    {'code': 0, 'name': 'Lagos'},
    {'code': 1, 'name': 'Abuja'},
    {'code': 2, 'name': 'Kano'},
    {'code': 3, 'name': 'Kaduna'}
  ]; 

  currencies: any[] = [];      
  // currencyCode = this.quotation.currency.code; 
  // currencySymbol = this.quotation.currency.symbol; 
  currency = this.quotation.currency;

  paymentFrequencies: string[] = ['Anually', 'Semi-anually', 'Quarterly'];   paymentFrequency = this.quotation.paymentFrequency;

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
    this.id = this.route.snapshot.params['id'];
    this.quotationService.getQuotation(this.id).subscribe(quotation => {
      this.quotation = quotation;
      this.client = this.quotation.client;
      // console.log(quotation);
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
    this.clients = users; 

    // fetch currencies from API
    var currencies = this.quotationService.currencies;
    // console.log(currencies)
    var size = 0, key; var code = 0;
    for (key in currencies) {
      this.currencies.push({
        "code": code++,
        "name": currencies[key].name,
        "symbol": currencies[key].symbol
      });
    }
    console.log(this.currencies);
  } 

  onSubmit({value, valid}: {value: Quotation, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add id to Quote and Update Quote
      value.id = this.id
      this.quotationService.updateQuotation(value);
      this.flashMessage.show('Quote updated Successfully!', {cssClass: 'alert-success', timeout:4000});
      // save values in a session variable, then re-route to quote-products
      // sessionStorage.setItem("quoteCode", JSON.stringify(value.code));
      this.router.navigate([`/quotation-details/${this.id}`]);
    }
  }
}
