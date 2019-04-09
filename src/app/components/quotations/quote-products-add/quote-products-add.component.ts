import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
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

  products: QuoteProduct[] = []; product = null;
  quotations: Quotation[] = []; quotation = null
  quoteProducts: QuoteProduct[] = [];
  productCode = null;
  quoteCode: number; // Get quoteCode from session
  quoteInfo: any; // get quotation from session

  quoteProduct: QuoteProduct = {
    id: '',
    name: '',
    code: 0,
    description: '',
    quoteCode: 0,
    productCode: 0
  }

  @ViewChild('quoteProductForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private router: Router
  ) { }

  ngOnInit() {
    // get quoteCode from session variable
    this.quoteInfo = JSON.parse(sessionStorage.getItem("quoteInfo"));
    this.quoteCode = this.quoteInfo.code;
    this.quotationService.getProducts().subscribe(products => {
      this.products = products;
    });

    // Fetch existing products, get last product number, then generate new product number
    this.quotationService.getQuoteProducts().subscribe(quoteProducts => {
      this.quoteProducts = quoteProducts;
      for(var i=0; i < quoteProducts.length; i++){
        if(quoteProducts[i].code > this.quoteProduct.code ) this.quoteProduct.code = quoteProducts[i].code;
      }
      this.quoteProduct.code += 1;
      // console.log(this.quoteProduct.code)
    });
  }

  onSubmit({value, valid}: {value: QuoteProduct, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add New Quote
      value.quoteCode = this.quoteCode;
      value.code = this.quoteProduct.code;
      this.quotationService.newQuoteProduct(value);
      // save quoteProductValue in session variable
      // sessionStorage.setItem("quoteProductCode", JSON.stringify(value.code));
      sessionStorage.setItem("quoteProduct", JSON.stringify(value));
      this.router.navigate(['/quote-risks-add']); 
    }
  }
}
