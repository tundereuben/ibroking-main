import { Component, OnInit } from '@angular/core';
import { SetupService } from '../../../services/setup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product: Product;

  constructor(
    private setupService: SetupService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // this.setupService.getProduct(this.id).subscribe(product => {
    //   this.product = product;
    //   // console.log(product)
    // })
  }

  onDeleteClick() {
    if(confirm('Are you sure?')){
      this.setupService.deleteProduct(this.product);
      this.flashMessage.show('Product removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/products']);
    }
  }

}
