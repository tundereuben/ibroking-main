import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';

import { Product } from '../../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  product: Product;

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  delete(product: Product)  : void {
    if(confirm("Are you sure?")) {
      this.setupService.deleteProduct(product)
      .subscribe(data => {
        this.products = this.products.filter(p => p !== product);
    });
    }
  }

}
