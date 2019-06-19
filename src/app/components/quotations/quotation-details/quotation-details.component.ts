import { Component, OnInit, ɵConsole } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Quotation } from '../../../models/Quotation';
import { Product } from '../../../models/Product';
import { QuoteRisk } from '../../../models/QuoteRisk';
import { QuoteRiskLimit } from '../../../models/QuoteRiskLimit';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.css']
})
export class QuotationDetailsComponent implements OnInit {
  id: number;
  quotation: Quotation;
  quoteProducts: Product[] = [];
  quotNo: String;
  quoteProductCode: number;
  quoteRiskCode: number;
  quoteRisks: QuoteRisk[];
  quoteRiskLimits: QuoteRiskLimit[];

  constructor(
    private quotationService: QuotationService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    var quotNo, qpQuotCode, qpQuotNo, quoteRiskCode, products = [], risks = [], riskLimits = [];
    
    this.id = this.route.snapshot.params['id'];
    this.quotationService.getQuotation(this.id).subscribe(quotation => {
      this.quotation = quotation; 
      quotNo = quotation.quotNo;
      this.quotNo = quotNo;
      // console.log(quotNo);
    });
  

    this.quotationService.getQuoteProducts().subscribe(quoteProducts => {
      quoteProducts.forEach(function(doc){ 
        // console.log(doc.qpQuotNo);
        if(doc.qpQuotNo == quotNo ) {
          products.push(doc); 
          qpQuotNo = doc.qpQuotNo;
        };
      });
      this.quoteProducts = products;
      // console.log(this.quoteProducts);
    });
  }

  showRisks(event){
    this.quoteRisks = null; 
    this.quoteRiskLimits = null;
    var quoteProductCode, quoteRiskCode, riskArray = [];
    quoteProductCode = parseInt(event.target.id); 
    // console.log(quoteProductCode);
    this.quotationService.getQuoteRisks().subscribe(risks => {
      // console.log(risks);
      risks.forEach(function(doc){
        if(doc.qrQpCode === quoteProductCode) {
         riskArray.push(doc);
         quoteRiskCode = doc.qrQpCode;
        } 
      });
      this.quoteRisks = riskArray;
      // console.log(riskArray)
    });
    this.quoteProductCode = quoteProductCode;  
  };

  showRiskLimits(event){
    var quoteRiskCode, riskLimitArray = [];
    quoteRiskCode = parseInt(event.target.id); 
    // console.log(quoteRiskCode);
    this.quotationService.getQuoteRiskLimits().subscribe(quoteRiskLimits => {
      quoteRiskLimits.forEach((doc)=> {
        if(doc.qrlQrCode == quoteRiskCode){
          // console.log(doc);
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

  // deleteRiskLimit(event) {
  //   var id = event.target.id;
  //   this.quotationService.deleteQuoteRiskLimit(id);
  //   window.location.reload();
  // }

  // addRisk(){
  //   var isAdd = true;
  //   sessionStorage.setItem("isAdd", JSON.stringify(isAdd));
  //   this.addingNew();
  // }

  // addProduct(){
  //   var isAdd = true;
  //   this.addingNew();
  // }
  

  // onDeleteClick() {
  //   if(confirm('Are you sure?')) {
  //     this.quotationService.deleteQuotation(this.quotation);
  //     this.flashMessage.show('Quotation removed', {
  //       cssClass: 'alert-success', timeout: 4000
  //     });
  //     this.router.navigate(['/quotations']);
  //   }
  // }

  // addingNew(){
  //   sessionStorage.setItem("quoteRiskCode", JSON.stringify(this.quoteRiskCode));
  //   sessionStorage.setItem("quoteProductCode", JSON.stringify(this.quoteProductCode)); 
  //   sessionStorage.setItem("quoteId", JSON.stringify(this.id));
  //   sessionStorage.setItem("quoteCode", JSON.stringify(this.quoteCode));
  //   // console.log(this.quoteCode);
  // }

} 


