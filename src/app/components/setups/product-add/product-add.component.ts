import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Product } from '../../../models/Product';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  products: Product[];
  product: Product = {}; 
  // private sub = Subscription;

  @ViewChild('productForm', {static: false }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private setupService: SetupService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  onSubmit({value, valid}: {value: Product, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      const sub = this.setupService.addProduct(this.product)
      .subscribe(data => {
        this.product = data;
        this.flashMessage.show('New Product added', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/products']);
      });
    }
  }

}
