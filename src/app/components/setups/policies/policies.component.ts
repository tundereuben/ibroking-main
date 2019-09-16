import { Component, OnInit } from '@angular/core';
import { SetupService} from '../../../services/setup.service'; 

import { Policy } from '../../../models/Policy';
import { setupClass } from '../../../models/Class';
import { Clause } from '../../../models/Clause';
import { Id } from '../../../models/Id';
import { Discount } from '../../../models/Discount';
import { Loading } from '../../../models/Loading';
import { Commission } from '../../../models/Commission';
import { Extension } from '../../../models/Extension';
import { Benefit } from '../../../models/Benefit';
import { Subclass } from '../../../models/Subclass';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

   policies: Policy[];
   policy: Policy = {};

   subclasses: Subclass[]=[];
   subclass: Subclass = {};

   clauses: Clause[] = [];
   clause: Clause = {};

   extensions: Extension[] = [];
   extension: Extension = {};

    ids: Id[] = [];
    id: Id = {};
    idTypes: any[];

    discounts: Discount[] = [];
    discount: Discount = {};

    loadings: Loading[] = [];
    loading: Loading = {};  

    commissions: Commission[] = [];
    commission: Commission = {}; 

    benefits: Benefit[] = [];
    benefit: Benefit = {};

  constructor(
    private setupService: SetupService
  ) { }

  ngOnInit() {

     this.setupService.getPolicies().subscribe(policies => {
      this.policies = policies;
    });
  }

   // Delete a Policy and it's children
   deletePolicy(policy: Policy) {

    if(confirm(`Are you sure you want to remove the ${policy.polName} and all related info?`)) {
      //  Fetch & Delete All Child-Clauses
     this.setupService.getClausesByPolCode(policy.polCode).subscribe(clauses => {
        clauses.forEach((clause) => {
          this.setupService.deleteClause(clause)
            .subscribe(data => {
              this.clauses = this.clauses.filter(c => c !== clause);
            })
          })
      });

     //  Fetch & Delete All Child-Extensions
     this.setupService.getExtensionsByPolCode(policy.polCode).subscribe(extensions => {
        extensions.forEach((extension) => {
          this.setupService.deleteExtension(extension)
            .subscribe(data => {
              this.extensions = this.extensions.filter(c => c !== extension);
            })
          }); 
      });

      //  Fetch & Delete All Child-IDs
      this.setupService.getIdsByPolCode(policy.polCode).subscribe(ids => {
        ids.forEach((id) => {
          this.setupService.deleteId(id)
            .subscribe(data => {
              this.ids = this.ids.filter(c => c !== id);
            })
          }); 
      });

       //  Fetch & Delete All Child-Discounts
       this.setupService.getDiscountsByPolCode(policy.polCode).subscribe(discounts => {
          discounts.forEach((discount) => {
            this.setupService.deleteDiscount(discount)
              .subscribe(data => {
                this.discounts = this.discounts.filter(c => c !== discount);
              })
            }); 
        });

         //  Fetch & Delete All Child-Loadings
        this.setupService.getLoadingsByPolCode(policy.polCode).subscribe(loadings => {
          loadings.forEach((loading) => {
            this.setupService.deleteLoading(loading)
              .subscribe(data => {
                this.loadings = this.loadings.filter(c => c !== loading);
              })
            }); 
        });

         //  Fetch & Delete All Child-Commissions
         this.setupService.getCommissionsByPolCode(policy.polCode).subscribe(commissions => {
          commissions.forEach((commission) => {
            this.setupService.deleteCommission(commission)
              .subscribe(data => {
                this.commissions = this.commissions.filter(c => c !== commission);
              })
            }); 
        });

         //  Fetch & Delete All Child-Benefits
       this.setupService.getBenefitsByPolCode(0).subscribe(benefits => {
          benefits.forEach((benefit) => {
            this.setupService.deleteBenefit(benefit)
              .subscribe(data => {
                this.benefits = this.benefits.filter(c => c !== benefit);
              })
            }); 
        });

        // ====== REMOVE ALL SUBCLASSES BEFORE POLICY ====

        //  Finally, delete the policy/product
        this.setupService.deletePolicy(policy)
        .subscribe(data => {
          this.policies = this.policies.filter(c => c !== policy);
        })

    }
   }

   

  // When a Policy is added
  addPolicy(){
    // Collect form inputs
    this.policy.polName = (<HTMLInputElement>document.getElementById('polName')).value;
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

   // Delete a Policy => make this a function that other modules can call
  //  deletePolicy(policy: Policy)  : void {
  //    if(confirm(`Are you sure you want to remove the ${policy.polName} and all child elements?`)) {
  //     this.setupService.deletePolicy(policy).subscribe(data => this.policies = this.policies.filter(c => c !== policy))
  //    }
    
  // } 

  // Show Subclasses related to a policy
  showSubclasses(policy) {
    this.policy = policy;
    // Get all subclasses with the given polCode
    this.setupService.getSubclassesByPolCode(this.policy.polCode).subscribe(subclasses => {
      this.subclasses = subclasses;
    });
  }

  // When New Subclass is Clicked
  newSubclass() {
    if(!this.policy.polCode) {
      alert('Select a Policy First');
    } else {
      // console.log(this.policy.polCode, 'add subclass clicked')
    }
  }

  // When A Policy Subclass is added
  addSubclass(){
    this.subclass.sclName = (<HTMLInputElement>document.getElementById('sclName')).value;
    if(!this.subclass.sclName) {
      // Show Error Message 
      this.showAlert('subclassMessage'); 
    } else {
      this.subclass.sclPolCode = this.policy.polCode;
      const sub =  this.setupService.addSubclass(this.subclass)
      .subscribe(subclass => {
        // Fetch Subclasses
        this.setupService.getSubclassesByPolCode(subclass.sclPolCode).subscribe(subclasses => {
          this.subclasses = subclasses;
        });
        (<HTMLInputElement>document.getElementById('sclName')).value='';
      });
    }
  }

  // Delete a Subclass
  deleteSubclass(subclass: Subclass)  : void {
    this.setupService.deleteSubclass(subclass).subscribe(data => this.subclasses = this.subclasses.filter(c => c !== subclass))
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
