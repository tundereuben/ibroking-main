import { Component, OnInit } from '@angular/core';
import { QuotationService} from '../../../services/quotation.service'; 

import { Quotation } from '../../../models/Quotation';
import { defineBase, element } from '@angular/core/src/render3';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {
  quotations: Quotation[];

  constructor(private quotationService: QuotationService) { }

  ngOnInit() {
    this.quotationService.getQuotations().subscribe(quotations => {
      this.quotations = quotations;
      this.quotations.forEach(function(doc){
        console.log(doc);
      }) 
    });
  }
}
