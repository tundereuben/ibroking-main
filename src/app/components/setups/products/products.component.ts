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

  constructor(private setupService: SetupService) { }

  ngOnInit() {
    this.setupService.getProducts().subscribe(products => {
      this.products = products;
      // console.log(this.products)
    })
  }

}
