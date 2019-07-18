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
  selector: 'app-policy-add',
  templateUrl: './policy-add.component.html',
  styleUrls: ['./policy-add.component.css']
})
export class PolicyAddComponent implements OnInit {
  polCode: number; 

  // classes: setupClass[]; 
  // class: setupClass;

  subclasses: Subclass[] = []; 
  subclass: Subclass = {};

  clauses: Clause[] = [];
  clause: Clause = {};
  clsName: string = null;

  // IDs
  ids: Id[] = [];
  id: Id = {};
  
  // Discounts
  discounts: Discount[] = [];
  discount: Discount = {};

  // Discounts
  loadings: Loading[] = [];
  loading: Loading = {};  

  // Commissions
  commissions: Commission[] = [];
  commission: Commission = {};  

  // Extensions
  extensions: Extension[] = [];
  extension: Extension = {};
  
  // Benefits
  benefits: Benefit[] = [];
  benefit: Benefit = {};

  // For Discount, Loading, Commission, etc
  types: string[];
  type: string = null;
  calcOns: string[];
  calcOn: string = null;
  idTypes: any[];

  // Policies
  policies: Policy[] = [];
  policy: Policy = {};
  

  constructor(
    private setupService: SetupService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    // Get Policy ID from router link
    this.polCode = this.route.snapshot.params['id'];
    this.setupService.getPolicy(this.polCode).subscribe(policy => {
      this.policy = policy;
      console.log(this.policy.polCode);
    });

    // IDs
    this.idTypes = ['Text', 'Number', 'Date', 'Boolean'];

    // For Discount, Loading, Commission, etc
    this.types = ['Rate', 'Value'];
    this.calcOns = ['Premium', 'Sum Insured'];
  }


// ========== CLICK FUNCTIONS ==========//
  // When a Policy is added
  addPolicy(){
    // Collect form inputs
    this.policy.polName = (<HTMLInputElement>document.getElementById('polName')).value;
    // this.policy.polClaName = (<HTMLInputElement>document.getElementById('polClaName')).value;
    // this.policy.polSclName = (<HTMLInputElement>document.getElementById('polSclName')).value;

    // Check if Policy name is not empty
    if(!this.policy.polName) {
      this.showAlert('policyMessage')
    } else {
      // if not empty, fetch most recent and clear db
     
      const sub =  this.setupService.addPolicy(this.policy)
      .subscribe(policy => {
          this.setupService.getPolicies().subscribe(policies => {
            this.policies = policies;
            this.policy = this.policies[0];
          }); 

          let showClass = `
          <span  class="label label-primary"> Product: ${this.policy.polName} 
            <span class="glyphicon glyphicon-remove delete"></span>
          </span>
          `;
        (<HTMLInputElement>document.getElementById('policyMessage')).innerHTML = showClass;
      });
    }
  }

  // When A Clause is added
  addClause(event: any){
    let clsInput = (<HTMLInputElement>document.getElementById('clsName'));
    this.clsName = clsInput.value;
    if(!this.clsName || !this.policy) {
      // Show Error Message 
      this.showAlert('clauseMessage'); 
    } else {
      this.clause.clsName = this.clsName;
      this.clause.clsPolCode = this.policy.polCode;
      const sub =  this.setupService.addClause(this.clause)
      .subscribe(clause => {
        this.clauses.push(clause); 
        //  Fetch Clauses
          this.setupService.getClausesByPolCode(this.policy.polCode).subscribe(clauses => {
            this.clauses = clauses;
            console.log(this.clauses);
        });
        (<HTMLInputElement>document.getElementById('clsName')).value='';
      });     
    }
  }

  // When A Policy Subclass is added
  addSubclass(event: any){
    this.subclass.sclName = (<HTMLInputElement>document.getElementById('sclName')).value;
    if(!this.subclass.sclName) {
      // Show Error Message 
      this.showAlert('subclassMessage'); 
    } else {
      this.subclass.sclPolCode = this.policy.polCode;
      const sub =  this.setupService.addSubclass(this.subclass)
      .subscribe(subclass => {
        this.subclasses.push(subclass); 
        // Fetch Subclasses
        this.setupService.getSubclassesByPolCode(subclass.sclPolCode).subscribe(subclasses => {
          this.subclasses = subclasses;
          console.log(this.subclasses);
        });
        (<HTMLInputElement>document.getElementById('sclName')).value='';
      });
    }
  }

  // Delete a subclass => make this a function that other modules can call
  deleteSubclass(subclass: Subclass)  : void {
    this.setupService.deleteSubclass(subclass)
    .subscribe(data => {
      this.subclasses = this.subclasses.filter(c => c !== subclass);
    })
  }

   // When an Extension is added
  addExtension(event: any){
    this.extension.extName = (<HTMLInputElement>document.getElementById('extName')).value;
    if(!this.extension.extName) {
      // Show Error Message 
      this.showAlert('extensionMessage'); 
    } else {
      this.extension.extPolCode = this.policy.polCode;
      const sub =  this.setupService.addExtension(this.extension)
      .subscribe(extension => {
        this.extensions.push(extension); 
        // Fetch Extensions
        this.setupService.getExtensionsByPolCode(this.policy.polCode).subscribe(extensions => {
          this.extensions = extensions;
          // console.log(this.extensions);
        });
        (<HTMLInputElement>document.getElementById('extName')).value='';
      });
    }
  }

  // Delete a Commission => make this a function that other modules can call
  deleteExtension(extension: Extension)  : void {
    this.setupService.deleteExtension(extension)
    .subscribe(data => {
      this.extensions = this.extensions.filter(c => c !== extension);
    })
  }

  // When An ID is added
  addId(event: any){
    this.id.idName = (<HTMLInputElement>document.getElementById('idName')).value;
    this.id.idType = (<HTMLInputElement>document.getElementById('idType')).value;
    this.id.idPolCode = this.policy.polCode; 
    if(!this.id.idPolCode) {
      // Show Error Message 
      this.showAlert('idMessage'); 
    } else {
      // this.id.idName = (<HTMLInputElement>document.getElementById('idName')).value;
      // this.id.idType = (<HTMLInputElement>document.getElementById('idType')).value;
      const sub =  this.setupService.addId(this.id)
      .subscribe(id => {
        this.ids.push(id); 
        // Fetch IDs
        this.setupService.getIdsByPolCode(this.policy.polCode).subscribe(ids => {
          this.ids = ids;
        });
        (<HTMLInputElement>document.getElementById('idName')).value='';
      });
    }
  }

  // Delete a ID => make this a function that other modules can call
  deleteId(id: Id)  : void {
    this.setupService.deleteId(id)
    .subscribe(data => {
      this.ids = this.ids.filter(c => c !== id);
    })
  }

  // When a Discount is added
  addDiscount(event: any){
    this.discount.dsctName = (<HTMLInputElement>document.getElementById('dsctName')).value;
    this.discount.dsctType = (<HTMLInputElement>document.getElementById('dsctType')).value;
    this.discount.dsctCalcOn = (<HTMLInputElement>document.getElementById('dsctCalcOn')).value;
    this.discount.dsctDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('dsctDefaultValue')).value);
    this.discount.dsctPolCode = this.policy.polCode; 
    // console.log(this.discount);

    if(!this.discount.dsctName) {
      // Show Error Message 
      this.showAlert('discountMessage'); 
    } else {
      const sub =  this.setupService.addDiscount(this.discount)
      .subscribe(discount => {
        this.discounts.push(discount); 
        // Fetch DISCOUNTS
        this.setupService.getDiscountsByPolCode(this.policy.polCode).subscribe(discounts => {
          this.discounts = discounts;
        });
        (<HTMLInputElement>document.getElementById('dsctName')).value='';
      });
    }
  }

  // Delete a Discount => make this a function that other modules can call
  deleteDiscount(discount: Discount)  : void {
    this.setupService.deleteDiscount(discount)
    .subscribe(data => {
      this.discounts = this.discounts.filter(c => c !== discount);
    })
  }

  // When a Loading is added
  addLoading(event: any){
    this.loading.loadName = (<HTMLInputElement>document.getElementById('loadName')).value;
    this.loading.loadType = (<HTMLInputElement>document.getElementById('loadType')).value;
    this.loading.loadCalcOn = (<HTMLInputElement>document.getElementById('loadCalcOn')).value;
    this.loading.loadDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('loadDefaultValue')).value);
    this.loading.loadPolCode = this.policy.polCode; 

    if(!this.loading.loadName) {
      // Show Error Message 
      this.showAlert('loadingMessage'); 
    } else {
      const sub =  this.setupService.addLoading(this.loading)
      .subscribe(loading => {
        this.loadings.push(loading); 
        // Fetch Loadings
        this.setupService.getLoadingsByPolCode(this.policy.polCode).subscribe(loadings => {
          this.loadings = loadings;
        });
        (<HTMLInputElement>document.getElementById('loadName')).value='';
      });
    }
  }

  // Delete a Loading => make this a function that other modules can call
  deleteLoading(loading: Loading)  : void {
    this.setupService.deleteLoading(loading)
    .subscribe(data => {
      this.loadings = this.loadings.filter(c => c !== loading);
    })
  }

   // When a Commission is added
   addCommission(event: any){
    this.commission.commName = (<HTMLInputElement>document.getElementById('commName')).value;
    this.commission.commType = (<HTMLInputElement>document.getElementById('commType')).value;
    this.commission.commCalcOn = (<HTMLInputElement>document.getElementById('commCalcOn')).value;
    this.commission.commDefaultValue = parseFloat((<HTMLInputElement>document.getElementById('commDefaultValue')).value);
    this.commission.commPolCode = this.policy.polCode; 

    if(!this.commission.commName) {
      // Show Error Message 
      this.showAlert('commissionMessage'); 
    } else {
      const sub =  this.setupService.addCommission(this.commission)
      .subscribe(commission => {
        this.commissions.push(commission); 
        // Fetch Commissions
        this.setupService.getCommissionsByPolCode(this.policy.polCode).subscribe(commissions => {
          this.commissions = commissions;
        });
        (<HTMLInputElement>document.getElementById('commName')).value='';
      });
    }
  }

  // Delete a Commission => make this a function that other modules can call
  deleteCommission(commission: Commission)  : void {
    this.setupService.deleteCommission(commission)
    .subscribe(data => {
      this.commissions = this.commissions.filter(c => c !== commission);
    })
  }

 

  // When a Benefit is added
  addBenefit(event: any){
    this.benefit.bftName = (<HTMLInputElement>document.getElementById('bftName')).value;
    this.benefit.bftRate = parseFloat((<HTMLInputElement>document.getElementById('bftRate')).value);
    this.benefit.bftNo = parseFloat((<HTMLInputElement>document.getElementById('bftNo')).value);
    this.benefit.bftMultBy = parseFloat((<HTMLInputElement>document.getElementById('bftMultBy')).value);
    this.benefit.bftPolCode = this.policy.polCode; 

    if(!this.benefit.bftName) {
      // Show Error Message 
      this.showAlert('benefitMessage'); 
    } else {
      const sub =  this.setupService.addBenefit(this.benefit)
      .subscribe(benefit => {
        this.benefits.push(benefit); 
         // Fetch Benefits
         this.setupService.getBenefitsByPolCode(this.policy.polCode).subscribe(benefits => {
          this.benefits = benefits;
        });
        (<HTMLInputElement>document.getElementById('bftName')).value='';
      });
    }
  }

  // Delete a Benefit => make this a function that other modules can call
  deleteBenefit(benefit: Benefit)  : void {
    this.setupService.deleteBenefit(benefit)
    .subscribe(data => {
      this.benefits = this.benefits.filter(c => c !== benefit);
    })
  }




  // Display error message
  showAlert(id) {
    let alertMessage = (<HTMLInputElement>document.getElementById(`${id}`));
      alertMessage.innerHTML = `<span class="alert alert-danger">Please fill out form correctly!</span>`;
      setTimeout(() => {
        alertMessage.innerHTML = ''
      }, 3000);
  }

}
