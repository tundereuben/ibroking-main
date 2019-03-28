import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SetupService } from '../../../services/setup.service';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  products: Product[];

  product: Product = {
    id: '',
    code: 0,
    name: '',
    description: '',
    // shortDescription: ''
  }

  @ViewChild('productForm') form: any;

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
      this.setupService.newProduct(value);
      this.flashMessage.show('New product added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/products']);
    }
  }

}
