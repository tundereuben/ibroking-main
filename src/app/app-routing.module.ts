import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';

import { ClassComponent } from './components/setups/class/class.component';
import { ClassAddComponent } from './components/setups/class-add/class-add.component';
import { ClassDetailsComponent } from './components/setups/class-details/class-details.component';
import { ClassEditComponent } from './components/setups/class-edit/class-edit.component';

import { SubclassComponent } from './components/setups/subclass/subclass.component';
import { SubclassAddComponent } from './components/setups/subclass-add/subclass-add.component';
import { SubclassDetailsComponent } from './components/setups/subclass-details/subclass-details.component';
import { SubclassEditComponent } from './components/setups/subclass-edit/subclass-edit.component';

import { ProductsComponent } from './components/setups/products/products.component';
import { ProductAddComponent } from './components/setups/product-add/product-add.component';
import { ProductDetailsComponent } from './components/setups/product-details/product-details.component';
import { ProductEditComponent } from './components/setups/product-edit/product-edit.component';

import { ClausesComponent } from './components/setups/clauses/clauses.component';
import { ClauseAddComponent } from './components/setups/clause-add/clause-add.component';
import { ClauseDetailsComponent } from './components/setups/clause-details/clause-details.component';
import { ClauseEditComponent } from './components/setups/clause-edit/clause-edit.component';

import { SectionsComponent } from './components/setups/sections/sections.component';
import { SectionAddComponent } from './components/setups/section-add/section-add.component';
import { SectionDetailsComponent } from './components/setups/section-details/section-details.component';
import { SectionEditComponent } from './components/setups/section-edit/section-edit.component';

import { CovertypesComponent } from './components/setups/covertypes/covertypes.component';
import { CovertypeAddComponent } from './components/setups/covertype-add/covertype-add.component';
import { CovertypeDetailsComponent } from './components/setups/covertype-details/covertype-details.component';
import { CovertypeEditComponent } from './components/setups/covertype-edit/covertype-edit.component';

import { QuotationsComponent } from './components/quotations/quotations/quotations.component';
import { QuotationAddComponent } from './components/quotations/quotation-add/quotation-add.component';
import { QuotationDetailsComponent } from './components/quotations/quotation-details/quotation-details.component';
import { QuotationEditComponent } from './components/quotations/quotation-edit/quotation-edit.component';

import { QuoteProductsComponent } from './components/quotations/quote-products/quote-products.component';
import { QuoteProductsAddComponent } from './components/quotations/quote-products-add/quote-products-add.component';
import { QuoteProductsDetailsComponent } from './components/quotations/quote-products-details/quote-products-details.component';
import { QuoteProductsEditComponent } from './components/quotations/quote-products-edit/quote-products-edit.component';

import { QuoteRisksComponent } from './components/quotations/quote-risks/quote-risks.component';
import { QuoteRisksAddComponent } from './components/quotations/quote-risks-add/quote-risks-add.component';
import { QuoteRisksDetailsComponent } from './components/quotations/quote-risks-details/quote-risks-details.component';
import { QuoteRisksEditComponent } from './components/quotations/quote-risks-edit/quote-risks-edit.component';

import { QuoteRiskLimitsComponent } from './components/quotations/quote-risk-limits/quote-risk-limits.component';
import { QuoteRiskLimitsAddComponent } from './components/quotations/quote-risk-limits-add/quote-risk-limits-add.component';
import { QuoteRiskLimitsDetailsComponent } from './components/quotations/quote-risk-limits-details/quote-risk-limits-details.component';
import { QuoteRiskLimitsEditComponent } from './components/quotations/quote-risk-limits-edit/quote-risk-limits-edit.component';

import { IdsComponent } from './components/setups/ids/ids.component';
import { BenefitsComponent } from './components/setups/benefits/benefits.component';
import { DiscountComponent } from './components/setups/discount/discount.component';
import { LoadingsComponent } from './components/setups/loadings/loadings.component';
import { CommissionsComponent } from './components/setups/commissions/commissions.component';
import { PoliciesComponent } from './components/setups/policies/policies.component';
import { PolicyAddComponent } from './components/setups/policy-add/policy-add.component';
import { PolicyEditComponent } from './components/setups/policy-edit/policy-edit.component';

import { ClientNewComponent } from './components/setups/client-new/client-new.component';
import { ClientContactComponent } from './components/setups/client-contact/client-contact.component';
import { ClientEditComponent } from './components/setups/client-edit/client-edit.component';
import { ClientDetailsComponent } from './components/setups/client-details/client-details.component';

import { UnderwriterAddComponent } from './components/setups/underwriter-add/underwriter-add.component';
import { UnderwriterDetailsComponent } from './components/setups/underwriter-details/underwriter-details.component';
import { UnderwriterEditComponent } from './components/setups/underwriter-edit/underwriter-edit.component';

import { UserAddComponent } from './components/setups/user-add/user-add.component';
import { UserDetailsComponent } from './components/setups/user-details/user-details.component';
import { UserEditComponent } from './components/setups/user-edit/user-edit.component';

import { CrmComponent } from './components/setups/crm/crm.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},

  {path: 'class', component: ClassComponent, canActivate: [AuthGuard]},
  {path: 'class-add', component: ClassAddComponent, canActivate: [AuthGuard]},
  {path: 'class-details/:id', component: ClassDetailsComponent, canActivate: [AuthGuard]},
  {path: 'class-edit/:id', component: ClassEditComponent, canActivate: [AuthGuard]},
  
  {path: 'subclass', component: SubclassComponent, canActivate: [AuthGuard]},
  {path: 'subclass-add', component: SubclassAddComponent, canActivate: [AuthGuard]},
  {path: 'subclass-details/:id', component: SubclassDetailsComponent, canActivate: [AuthGuard]},
  {path: 'subclass-edit/:id', component: SubclassEditComponent, canActivate: [AuthGuard]},


  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'product-edit/:id', component: ProductEditComponent, canActivate: [AuthGuard]},

  {path: 'clauses', component: ClausesComponent, canActivate: [AuthGuard]},
  {path: 'clause-add', component: ClauseAddComponent, canActivate: [AuthGuard]},
  {path: 'clause-details/:id', component: ClauseDetailsComponent, canActivate: [AuthGuard]},
  {path: 'clause-edit/:id', component: ClauseEditComponent, canActivate: [AuthGuard]},

  {path: 'sections', component: SectionsComponent, canActivate: [AuthGuard]},
  {path: 'section-add', component: SectionAddComponent, canActivate: [AuthGuard]},
  {path: 'section-details/:id', component: SectionDetailsComponent, canActivate: [AuthGuard]},
  {path: 'section-edit/:id', component: SectionEditComponent, canActivate: [AuthGuard]},

  {path: 'covertypes', component: CovertypesComponent, canActivate: [AuthGuard]},
  {path: 'covertype-add', component: CovertypeAddComponent, canActivate: [AuthGuard]},
  {path: 'covertype-details/:id', component: CovertypeDetailsComponent, canActivate: [AuthGuard]},
  {path: 'covertype-edit/:id', component: CovertypeEditComponent, canActivate: [AuthGuard]},

  {path: 'quotations', component: QuotationsComponent, canActivate: [AuthGuard]},
  {path: 'quotation-add', component: QuotationAddComponent, canActivate: [AuthGuard]},
  {path: 'quotation-details/:id', component: QuotationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'quotation-edit/:id', component: QuotationEditComponent, canActivate: [AuthGuard]},

  {path: 'quote-products', component: QuoteProductsComponent, canActivate: [AuthGuard]},
  {path: 'quote-products-add/:id', component: QuoteProductsAddComponent, canActivate: [AuthGuard]},
  {path: 'quote-products-details/:id', component: QuoteProductsDetailsComponent, canActivate: [AuthGuard]},
  {path: 'quote-products-edit/:id', component: QuoteProductsEditComponent, canActivate: [AuthGuard]},

  {path: 'quote-risks', component: QuoteRisksComponent, canActivate: [AuthGuard]},
  {path: 'quote-risks-add/:id', component: QuoteRisksAddComponent, canActivate: [AuthGuard]},
  {path: 'quote-risks-details/:id', component: QuoteRisksDetailsComponent, canActivate: [AuthGuard]},
  {path: 'quote-risks-edit/:id', component: QuoteRisksEditComponent, canActivate: [AuthGuard]},

  {path: 'quote-risk-limits', component: QuoteRiskLimitsComponent, canActivate: [AuthGuard]},
  {path: 'quote-risk-limits-add/:id', component: QuoteRiskLimitsAddComponent, canActivate: [AuthGuard]},
  {path: 'quote-risk-limits-details/:id', component: QuoteRiskLimitsDetailsComponent, canActivate: [AuthGuard]},
  {path: 'quote-risk-limits-edit/:id', component: QuoteRiskLimitsEditComponent, canActivate: [AuthGuard]},

  {path: 'ids', component: IdsComponent},
  {path: 'benefits', component: BenefitsComponent, canActivate: [AuthGuard]},
  {path: 'discount', component: DiscountComponent, canActivate: [AuthGuard]},
  {path: 'loadings', component: LoadingsComponent, canActivate: [AuthGuard]},
  {path: 'commissions', component: CommissionsComponent},
  {path: 'policies', component: PoliciesComponent, canActivate: [AuthGuard]},
  {path: 'policy-add', component: PolicyAddComponent, canActivate: [AuthGuard]},
  {path: 'policy-edit/:id', component: PolicyEditComponent, canActivate: [AuthGuard]},

  {path: 'client-new', component: ClientNewComponent, canActivate: [AuthGuard]},
  {path: 'client-contact/:id', component: ClientContactComponent, canActivate: [AuthGuard]},
  {path: 'client-edit/:id', component: ClientEditComponent, canActivate: [AuthGuard]},
  {path: 'client-details/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},

  {path: 'underwriter-add', component: UnderwriterAddComponent, canActivate: [AuthGuard]},
  {path: 'underwriter-details/:id', component: UnderwriterDetailsComponent, canActivate: [AuthGuard]},
  {path: 'underwriter-edit/:id', component: UnderwriterEditComponent, canActivate: [AuthGuard]},

  {path: 'user-add', component: UserAddComponent, canActivate: [AuthGuard]},
  {path: 'user-details/:id', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard]},

  {path: 'crm', component: CrmComponent, canActivate: [AuthGuard]},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
 