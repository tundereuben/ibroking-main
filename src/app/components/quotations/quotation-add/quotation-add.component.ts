import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Quotation } from '../../../models/Quotation'; 
// import { stringify } from 'querystring'; 

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.css']
})
export class QuotationAddComponent implements OnInit {
  quotations: Quotation[] = [];
  code = 0;
  quotation: Quotation = {
    id: '',
    code: 0,
    quoteNo: 0,
    client: {},
    // clientCode: 0,
    // clientName: '',
    agent: {},
    // agentCode: 0,
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

  clients: any[]  = [];  client = null
  agentCode = null; 

  sourceCode = null; 
  sources: any[] = [
    {'code': 0, 'name': 'Direct'},
    {'code': 1, 'name': 'Walk-In'},
    {'code': 2, 'name': 'Referred'}
  ]; 

  branchCode = null;
  branches: any[] = [
    {'code': 0, 'name': 'Lagos'},
    {'code': 1, 'name': 'Abuja'},
    {'code': 2, 'name': 'Kano'},
    {'code': 3, 'name': 'Kaduna'}
  ]; 

  currencies: any[] = [];      currencyCode = null; currencySymbol = null; currency = null;
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
      for(var i=0; i < quotations.length; i++){
        if(quotations[i].code > this.code ) this.code = quotations[i].code;
      }
      this.code += 1;
    });

    
  } 

  onSubmit({value, valid}: {value: Quotation, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Quote
      value.code = this.code;
      // value.currencyCode = this.currency.code; value.currecnySymbol = this.currency.symbol;
      this.quotationService.newQuotation(value);

      // save values in a session variable, then re-route to quote-products
      sessionStorage.setItem("quoteCode", JSON.stringify(value.code));
      this.router.navigate(['/quote-products-add']);
    }
  }

}
