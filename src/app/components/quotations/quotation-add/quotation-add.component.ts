import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';
// import { MomentModule } from 'angular2-moment';

import { Quotation } from '../../../models/Quotation'; 
// import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.css']
})
export class QuotationAddComponent implements OnInit {
  quotations: Quotation[] = [];
  quoteCode = 0;
  quotCoverFrom: any;
  quotCoverTo: any;
  back: boolean  // Check when back button is clicked.

  quotation: Quotation = {
    quotAuthorisedBy: '',
    quotAgntAgentCode: 0,
    quotAuthorisedDt: null,
    quotBrnCode: 0,
    quotBranch: '',
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
    quotPaymentFrequency: '',
    quotNo: '',
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

  quotBranch = null;
  quotBranches: any[] = ['LAG', 'ABJ', 'KAD', 'KAN' ]; 

  currencies: any[] = [];      currency = null;
  quotPaymentFrequencies: string[] = ['Anually', 'Semi-anually', 'Quarterly'];   quotPaymentFrequency = null;

  usersUrl = 'https://jsonplaceholder.typicode.com/users';
  currencyUrl = 'https://restcountries.eu/rest/v2/currency/cop';

  @ViewChild('quotationForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {

     // Fetch existing quotes, get last quote number, then generate new quote number
     this.quotationService.getQuotations().subscribe(quotations => {
      this.quotations = quotations;
      this.quoteCode = quotations[0].quotCode + 1 ;
    });  

    // Fetch existing clients
    this.setupService.getClients().subscribe(clients => {
      this.clients = clients;
      // this.quoteCode = quotations[0].quotCode + 1 ;
      console.log(this.clients);
    }); 


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
        "shtDesc": currencies[key].code,
        "name": currencies[key].name,
        "symbol": currencies[key].symbol
      });
    }

    

    //  If the back button was clicked.
    // this.back = JSON.parse(sessionStorage.getItem("back"));
    if(this.back) {
      this.quotation = JSON.parse(sessionStorage.getItem("quotation"));
      console.log(this.quotation);
      var quotClntCode = this.quotation.quotClntCode;
      // this.client = this.clients[clntCode];
      // this.agent = this.quotation.agent;
      // this.source = this.quotation.source;
      // this.quotBranch = this.quotation.quotBranch; 
      // this.currency = this.quotation.currency;
      // this.quotCoverFrom = this.quotation.quotCoverFrom;
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
    this.quotCoverTo = yy + "-" + mm + "-" + dd;
  }

  onSubmit({value, valid}: {value: Quotation, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {

      // Add New Quote number
      var randomNumber = Math.floor(Math.random() * 1000000000); // Generate a random number for quote_number btw 0 and 1,000,000,000
      value.quotNo = `QT19${randomNumber}${value.quotBranch}`;
      value.quotCode = this.quoteCode;
      this.quotationService.addQuotation(value)
      .subscribe(response => 
                  // console.log(response), 
                  err => console.log(err));

      // save values in a session variable, then re-route to quote-products
      sessionStorage.setItem("quotation", JSON.stringify(value));
      this.router.navigate(['/quote-products-add']);

      // //  Get id of quotation
      // this.quotationService.getQuotations().subscribe(quotations => {
      //   // this.quotations = quotations;
      //   // this.quotations.forEach((quotation) => {
      //   //   if(quotation.code == value.code) {
      //   //     sessionStorage.setItem("quoteId", JSON.stringify(quotation.id));
      //   //   }
      //   // })
      // });
    }
  }

}
