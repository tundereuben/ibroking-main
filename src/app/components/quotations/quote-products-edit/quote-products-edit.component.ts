import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import { Product } from '../../../models/Product';
import { Quotation } from '../../../models/Quotation';
import { QuoteProduct } from '../../../models/QuoteProduct';

@Component({
  selector: 'app-quote-products-edit',
  templateUrl: './quote-products-edit.component.html',
  styleUrls: ['./quote-products-edit.component.css']
})
export class QuoteProductsEditComponent implements OnInit {

  products: QuoteProduct[] = []; product = null;
  quotations: Quotation[] = []; quotation = null
  quoteProducts: QuoteProduct[] = [];
  productCode = null;
  quoteCode: string; // Get quoteCode from session

  id: string;
  quoteProduct: QuoteProduct = {
    id: '',
    name: '',
    code: 0,
    description: '',
    quoteCode: 0,
    productCode: 0
  } 


  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.quotationService.getQuoteProduct(this.id).subscribe(quoteProduct => {
      this.quoteProduct = quoteProduct;
      console.log(this.quoteProduct);
    });

    this.quotationService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit({value, valid}: {value: QuoteProduct, valid: boolean}) {
    if(!valid) {
      // Show Error Message
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 5000});
    } else {
      // Add id to Quote and Update Quote
      value.id = this.id
      this.quotationService.updateQuoteProduct(value);
      this.flashMessage.show('Quote Product updated Successfully!', {cssClass: 'alert-success', timeout:4000});
      // this.router.navigate([`/quotation-details/${this.id}`]);
      this.goBack();
    }
  }

  goBack(){
    this.location.back();
  }

}