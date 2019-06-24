import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Product } from '../../../models/Product';
import { Quotation } from '../../../models/Quotation';
import { QuoteProduct } from '../../../models/QuoteProduct';

@Component({
  selector: 'app-quote-products-add',
  templateUrl: './quote-products-add.component.html',
  styleUrls: ['./quote-products-add.component.css']
})
export class QuoteProductsAddComponent implements OnInit {

  products: Product[] = []; product = null;
  quotations: Quotation[] = []; quotation = null
  quoteProducts: QuoteProduct[] = [];
  productCode = null;
  quoteCode: number; // Get quoteCode from session
  qpCode: number; // get qoute product from by increment latest quote code
  coverFrom: string;
  coverTo: string; 

  quoteProduct: QuoteProduct = {
    qpCode: 0,
    qpProCode: 0,
    qpProShtDesc: '',
    qpWefDate: null,
    qpWetDate: null,
    qpQuotCode: 0,
    qpQuotNo: '',
    qpTotalSi: 0,
    qpPremium: 0,
    qpComm: 0
  }
 
  @ViewChild('quoteProductForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    // get quoteCode from session variable
    this.quotation = JSON.parse(sessionStorage.getItem("quotation"));
    // this.quoteCode = this.quoteInfo.code;
    this.quoteProduct.qpWefDate = this.quotation.quotCoverFrom;
    this.quoteProduct.qpWetDate = this.quotation.quotCoverTo;
    console.log(this.quotation);

    
    this.setupService.getProducts().subscribe(products => {
      this.products = products;
      // console.log(this.products);
    });

    // Fetch existing products, get last product number, then generate new product number
    this.quotationService.getQuoteProducts().subscribe(quoteProducts => {
      this.quoteProducts = quoteProducts;
      this.qpCode = this.quoteProducts[0].qpCode + 1;
      // console.log(this.quoteProducts[0]);
    });
  }

  // When the back button is clicked.
  onBack(){
    let back = true;
    sessionStorage.setItem("back", JSON.stringify(back));
  }

  onSubmit({value, valid}: {value: QuoteProduct, valid: boolean}) {
    // console.log(value, valid);
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Quote
      // value.quoteCode = this.quoteCode;
      // value.code = this.quoteProduct.code;
      value.qpCode = this.qpCode;
      value.qpQuotNo = this.quotation.quotNo;
      value.qpQuotCode = this.quotation.quotCode;
      value.qpAgntCode = this.quotation.quotAgntCode;
      this.quotationService.addQuoteProduct(value)
      .subscribe(response => 
                  // console.log(response), 
                  err => console.log(err));
      // save quoteProductValue in session variable
      sessionStorage.setItem("quoteProduct", JSON.stringify(value));
      this.router.navigate(['/quote-risks-add']); 
    }
  }
}
