import { Component, OnInit } from '@angular/core';
import { SetupService} from '../../../services/setup.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { setupClass } from '../../../models/Class';
import { Subclass } from '../../../models/Subclass';
import { Clause } from '../../../models/Clause';
import { Policy } from '../../../models/Policy';
import { Id } from '../../../models/Id';
import { Discount } from '../../../models/Discount';
import { Loading } from '../../../models/Loading';
import { Commission } from '../../../models/Commission';
import { Extension } from '../../../models/Extension';
import { Benefit } from '../../../models/Benefit';

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.css']
})
export class PolicyEditComponent implements OnInit {
  polCode: number; // for Policy_ID

  policies: Policy[];
  policy: Policy = {};

  clauses: Clause[] = [];
  clause: Clause = {};

  extensions: Extension[] = [];
  extension: Extension = {};

   ids: Id[] = [];
   id: Id = {};

   idTypes: any[];
   types: string[];
   type: string = null;
   calcOns: string[];
  calcOn: string = null;

   discounts: Discount[] = [];
   discount: Discount = {};

   loadings: Loading[] = [];
   loading: Loading = {};  

   commissions: Commission[] = [];
   commission: Commission = {}; 

   benefits: Benefit[] = [];
   benefit: Benefit = {};

  constructor(
    private setupService: SetupService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     // IDs
     this.idTypes = ['Text', 'Number', 'Date', 'Boolean'];

     // For Discount, Loading, Commission, etc
     this.types = ['Rate', 'Value'];
     this.calcOns = ['Premium', 'Sum Insured'];

    //  Get Policy Details
    this.polCode = this.route.snapshot.params['id'];
    this.setupService.getPolicy(this.polCode).subscribe(policy => {
      this.policy = policy;
      console.log(this.policy);
    });

    this.setupService.getClausesByPolCode(this.polCode).subscribe(clauses => {
        this.clauses = clauses;
        console.log(this.clauses);
    });

    this.setupService.getExtensionsByPolCode(this.polCode).subscribe(extensions => {
        this.extensions = extensions;
        console.log(this.extensions);
    });

    this.setupService.getIdsByPolCode(this.polCode).subscribe(ids => {
        this.ids = ids;
        console.log(this.ids);
    });

    this.setupService.getDiscountsByPolCode(this.polCode).subscribe(discounts => {
        this.discounts = discounts;
        console.log(this.discounts);
    });

    this.setupService.getLoadingsByPolCode(this.polCode).subscribe(loadings => {
        this.loadings = loadings;
        console.log(this.loadings);
    });

    this.setupService.getCommissionsByPolCode(this.polCode).subscribe(commissions => {
        this.commissions = commissions;
        console.log(this.commissions);
    });

    this.setupService.getBenefitsByPolCode(this.polCode).subscribe(benefits => {
      this.benefits = benefits;
      console.log(this.benefits);
  });


  }

}
