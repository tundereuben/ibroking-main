import { Component, OnInit } from '@angular/core';
import { QuotationService} from '../../../services/quotation.service'; 
import { SetupService} from '../../../services/setup.service'; 

import { Quotation } from '../../../models/Quotation';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {
  quotations: Quotation[];

  constructor(
    private quotationService: QuotationService,
    private setupService: SetupService
    ) { }

  ngOnInit() {
    this.quotationService.getQuotations().subscribe(quotations => {
      this.quotations = quotations;
      this.quotations.forEach(function(doc){
        // console.log(doc);
      }) 
    });


    
  }
}
