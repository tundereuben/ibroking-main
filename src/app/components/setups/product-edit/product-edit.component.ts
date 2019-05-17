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
  id: number;
  product: Product = {
    proCode: null,
    proShtDesc: null,
    proDesc: ''
  }

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setupService.getProduct(this.id).subscribe((data) => {
      this.product = data;
    });
    
  }

  onSubmit(value): void {
    this.setupService.updateProduct(value)
      .subscribe(() => {
        this.flashMessage.show('Product Updated', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/products']);
      })
  }

}
