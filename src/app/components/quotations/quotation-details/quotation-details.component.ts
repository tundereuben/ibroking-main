import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Quotation } from '../../../models/Quotation';
import { Product } from '../../../models/Product';
import { QuoteRisk } from '../../../models/QuoteRisk';
import { QuoteRiskLimit } from '../../../models/QuoteRiskLimit';
import { Client } from '../../../models/Client';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.css']
})
export class QuotationDetailsComponent implements OnInit {
  id: number;
  quotation: Quotation;
  quoteProducts: Product[] = [];

  client: Client;
  clientName: String;

  quoteProductCode: number;
  quoteRiskCode: number;
  quoteRisks: QuoteRisk[];
  quoteRiskLimits: QuoteRiskLimit[];

  constructor(
    private quotationService: QuotationService,
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    var quotNo, 
        qpQuotCode, 
        qpQuotNo, 
        quoteRiskCode, 
        products = [], 
        risks = [], 
        riskLimits = [];

    // Get router_id and fetch quotation information
    this.id = this.route.snapshot.params['id'];
    this.quotationService.getQuotation(this.id).subscribe(quotation => {
      this.quotation = quotation; 

      this.setupService.getClient(this.quotation.quotClntCode).subscribe(client => {
        this.client = client; 
        // check for for individual or corporate to get clientName
        if(this.client.clntType == "Individual") {
          this.clientName = `${this.client.clntOthernames} ${this.client.clntLastname}`;
        } else {
          this.clientName = `${this.client.clntCompanyName}`;
        }

        this.quotationService.getQuoteProducts().subscribe(quotProducts => {
          quotProducts.forEach(function(doc) {
            if(doc.qpQuotCode == quotation.quotCode) {
              products.push(doc);
            }
          });
          this.quoteProducts = products;
        });

      });
    });
  

    // this.quotationService.getQuoteProducts().subscribe(quoteProducts => {
    //   quoteProducts.forEach(function(doc){ 
    //     console.log(doc.qpQuotNo);
    //     if(doc.qpQuotNo == this.quotation.quotNo ) {
    //       products.push(doc); 
    //       qpQuotNo = doc.qpQuotNo;
    //     };
    //   });
    //   this.quoteProducts = products;
    // });

  }

  showRisks(event){
    this.quoteRisks = null; 
    // this.quoteRiskLimits = null;
    var quoteProductCode, 
    quoteRiskCode, 
    riskArray = [];

    quoteProductCode = parseInt(event.qpCode); 
    this.quotationService.getQuoteRisks().subscribe(risks => {
      risks.forEach(function(doc){
        if(doc.qrQpCode === quoteProductCode) {
         riskArray.push(doc);
        } 
      });
      this.quoteRisks = riskArray;
    });
    this.quoteProductCode = quoteProductCode;  
  };

  showRiskLimits(event){
    var quoteRiskCode, riskLimitArray = [];
    quoteRiskCode = parseInt(event.qrCode); 
    this.quotationService.getQuoteRiskLimits().subscribe(quoteRiskLimits => {
      quoteRiskLimits.forEach((doc)=> {
        if(doc.qrlQrCode == quoteRiskCode){
          riskLimitArray.push(doc);
        }
      });
      this.quoteRiskLimits = riskLimitArray;
      this.quoteRiskCode = quoteRiskCode;
    })
  }

  // addRiskLimit(event){
  //   var isAddToRisk = true;
  //   sessionStorage.setItem("isAddToRisk", JSON.stringify(isAddToRisk));
  //   this.addingNew();
  // }

  // editRiskLimit(){
  //   sessionStorage.setItem("quoteId", JSON.stringify(this.id)); // store quoteId for re-routing
  // }

  // Delete Risk Limit
  deleteRiskLimit(event) {
    var id = event.target.id;
    this.quotationService.deleteQuoteRiskLimit(id).subscribe();
    window.location.reload();
  }

  // Delete Risk
  deleteRisk(event) {
    var id = event.target.id;
    this.quotationService.deleteQuoteRisk(id).subscribe();
    window.location.reload();
  }

  // Delete Risk
  deleteProduct(event) {
    var id = event.target.id;
    this.quotationService.deleteQuoteProduct(id).subscribe();
    window.location.reload();
  }

  addRisk(){
    var isAdd = true;
    sessionStorage.setItem("isAdd", JSON.stringify(isAdd));
    this.addingNew();
  }

  addProduct(){
    var isAdd = true;
    this.addingNew();
  } 

  editQuoteProduct(event){
    var qpCode = event.target.id;
    sessionStorage.setItem("qpCode", JSON.stringify(qpCode));
  }
   

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.quotationService.deleteQuotation(this.quotation).subscribe();
      this.flashMessage.show('Quotation removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      window.location.reload();
      this.router.navigate(['/quotations']);
      
    }
  }

  addingNew(){
    // sessionStorage.setItem("quotation", JSON.stringify(this.quotation));
    // sessionStorage.setItem("quoteProductCode", JSON.stringify(this.quoteProductCode)); 
    // sessionStorage.setItem("quoteId", JSON.stringify(this.id));
    // sessionStorage.setItem("quoteCode", JSON.stringify(this.quoteCode));
    console.log(this.quotation);
  }

} 


