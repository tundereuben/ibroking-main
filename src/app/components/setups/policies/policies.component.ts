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

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

   policies: Policy[];
   policy: Policy = {};

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
   delete(policy: Policy) {

     //  Fetch & Delete All Child-Clauses
     this.setupService.getClausesByPolCode(policy.polCode).subscribe(clauses => {
      clauses.forEach((clause) => {
        this.setupService.deleteClause(clause)
          .subscribe(data => {
            this.clauses = this.clauses.filter(c => c !== clause);
          })
          console.log(clause);
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

          //  Finally, delete the policy/product
          this.setupService.deletePolicy(policy)
          .subscribe(data => {
            this.policies = this.policies.filter(c => c !== policy);
          })

   }

   

  //  deleteClause(clause: Clause)  : void {
  //   this.setupService.deleteClause(clause)
  //   .subscribe(data => {
  //     this.clauses = this.clauses.filter(c => c !== clause);
  //   })
  // }

}
