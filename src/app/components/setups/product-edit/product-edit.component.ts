import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: string;
  product: Product = {
    id: '',
    name: '',
    code: '',
    description: '',
    // shortDescription: ''
  }

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getProduct(this.id).subscribe(product => {
      this.product = product;
    })
  }

  onSubmit({value, valid}: {value: Product, valid: boolean }) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      value.id = this.id;
      this.setupService.updateProduct(value);
      this.flashMessage.show('Product updated', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/products']);
    }
  }

}
