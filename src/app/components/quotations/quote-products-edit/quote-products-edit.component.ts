import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../../models/Product';
import { Quotation } from '../../../models/Quotation';
import { QuoteProduct } from '../../../models/QuoteProduct';

@Component({
  selector: 'app-quote-products-edit',
  templateUrl: './quote-products-edit.component.html',
  styleUrls: ['./quote-products-edit.component.css']
})
export class QuoteProductsEditComponent implements OnInit {

  products: Product[] = []; product = null;
  quotations: Quotation[] = []; quotation = null
  quoteProducts: QuoteProduct[] = [];
  productCode = null;
  quoteCode: string; // Get quoteCode from session

  id: number;
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


  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.quotationService.getQuoteProduct(this.id).subscribe(quoteProduct => {
      this.quoteProduct = quoteProduct;
      // console.log(this.quoteProduct);
    });

    this.setupService.getProducts().subscribe(products => {
      this.products = products;
      // console.log(this.products);
    });
  }

  onSubmit({value, valid}: {value: QuoteProduct, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add id to Quote and Update Quote
      value.qpCode = this.id
      this.quotationService.updateQuoteProduct(value)
      .subscribe(response => 
        console.log(response), 
        err => console.log(err));
      this.flashMessage.show('Quote Product updated Successfully!', {cssClass: 'alert-success', timeout:4000});
      // this.router.navigate([`/quotation-details/${this.id}`]);
      this.goBack();
    }
  }

  goBack(){
    this.location.back();
  }

}