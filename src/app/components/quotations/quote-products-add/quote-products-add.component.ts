import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { QuotationService } from '../../../services/quotation.service';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Policy } from '../../../models/Policy';
import { Subclass } from '../../../models/Subclass';
import { Product } from '../../../models/Product';
import { Quotation } from '../../../models/Quotation';
import { QuoteProduct } from '../../../models/QuoteProduct';
import { Clause } from '../../../models/Clause';

@Component({
  selector: 'app-quote-products-add',
  templateUrl: './quote-products-add.component.html',
  styleUrls: ['./quote-products-add.component.css']
})
export class QuoteProductsAddComponent implements OnInit {

  policies: Policy[]; 
  policy: Policy = null;

  subclasses: Subclass[];
  clauses: Clause[];

  products: Product[] = []; 
  product = null;

  quotations: Quotation[] = []; 
  quotation: Quotation;

  
  productCode = null;
  policyCode = null;

  quotCode: number; // Get quoteCode from session
  qpCode: number; // get qoute product from by increment latest quote code

  coverFrom: string;
  coverTo: string; 

  quoteProducts: QuoteProduct[] = [];
  quoteProduct: QuoteProduct = {
    qpCode: 0,
    qpPolCode: 0,
    qpProCode: 0,
    qpName: '',
    qpWefDate: null,
    qpWetDate: null,
    qpQuotCode: 0,
    qpQuotNo: '',
    qpTotalSi: 0,
    qpPremium: 0,
    qpComm: 0
  }
 
  @ViewChild('quoteProductForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private quotationService: QuotationService, 
    private setupService: SetupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get quotation code from path:id and fetch quotation info
    this.quotCode = this.route.snapshot.params['id'];
    this.quotationService.getQuotation(this.quotCode).subscribe(quotation => {
      this.quotation = quotation;
    });

    this.setupService.getPolicies().subscribe(policies => {
      this.policies = policies;
    })

    // Fetch existing products, get last product number, then generate new product number
    this.quotationService.getQuoteProducts().subscribe(quoteProducts => {
      this.quoteProducts = quoteProducts;
      this.qpCode = this.quoteProducts[0].qpCode + 1;
      // console.log(this.quoteProducts[0]);
    });
  }

  // When a policy is selected populate product get subclasses
  showProducts() {
    this.setupService.getSubclassesByPolCode(this.policyCode).subscribe(products => {
      this.subclasses = products;
    });    
  }

  showClauses() {
    this.setupService.getClausesBySubclassCode(this.productCode).subscribe(clauses => {
      this.clauses = clauses;
    })
  }


  // When the back button is clicked.
  // onBack(){
  //   let back = true;
  //   sessionStorage.setItem("back", JSON.stringify(back));
  // }

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

      // update quotation coverFrom and coverTo dates
      this.quotation.quotCoverFrom = value.qpWefDate;
      this.quotation.quotCoverTo = value.qpWetDate;
      this.quotationService.updateQuotation(this.quotation).subscribe(response => {
      });

      // Get Product Name, add to value then update;
      this.setupService.getSubclass(value.qpProCode).subscribe(product => {
        value.qpName = product.sclName;
        this.quotationService.addQuoteProduct(value).subscribe(response =>
          // console.log(response),
          err => console.log(err));
        // console.log(value);
      });

      this.router.navigate([`/quote-risks-add/${value.qpCode}`]); 
    }
  }
}
