import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';

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

import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},

  {path: 'class', component: ClassComponent},
  {path: 'class-add', component: ClassAddComponent},
  {path: 'class-details/:id', component: ClassDetailsComponent},
  {path: 'class-edit/:id', component: ClassEditComponent},
  
  {path: 'subclass', component: SubclassComponent},
  {path: 'subclass-add', component: SubclassAddComponent},
  {path: 'subclass-details/:id', component: SubclassDetailsComponent},
  {path: 'subclass-edit/:id', component: SubclassEditComponent},


  {path: 'products', component: ProductsComponent},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'product-edit/:id', component: ProductEditComponent},

  {path: 'clauses', component: ClausesComponent},
  {path: 'clause-add', component: ClauseAddComponent},
  {path: 'clause-details/:id', component: ClauseDetailsComponent},
  {path: 'clause-edit/:id', component: ClauseEditComponent},

  {path: 'sections', component: SectionsComponent},
  {path: 'section-add', component: SectionAddComponent},
  {path: 'section-details/:id', component: SectionDetailsComponent},
  {path: 'section-edit/:id', component: SectionEditComponent},

  {path: 'covertypes', component: CovertypesComponent},
  {path: 'covertype-add', component: CovertypeAddComponent},
  {path: 'covertype-details/:id', component: CovertypeDetailsComponent},
  {path: 'covertype-edit/:id', component: CovertypeEditComponent},

  {path: 'quotations', component: QuotationsComponent},
  {path: 'quotation-add', component: QuotationAddComponent},
  {path: 'quotation-details/:id', component: QuotationDetailsComponent},
  {path: 'quotation-edit/:id', component: QuotationEditComponent},

  {path: 'quote-products', component: QuoteProductsComponent},
  {path: 'quote-products-add', component: QuoteProductsAddComponent},
  {path: 'quote-products-details/:id', component: QuoteProductsDetailsComponent},
  {path: 'quote-products-edit/:id', component: QuoteProductsEditComponent},

  {path: 'quote-risks', component: QuoteRisksComponent},
  {path: 'quote-risks-add', component: QuoteRisksAddComponent},
  {path: 'quote-risks-details/:id', component: QuoteRisksDetailsComponent},
  {path: 'quote-risks-edit/:id', component: QuoteRisksEditComponent},

  {path: 'quote-risk-limits', component: QuoteRiskLimitsComponent},
  {path: 'quote-risk-limits-add', component: QuoteRiskLimitsAddComponent},
  {path: 'quote-risk-limits-details/:id', component: QuoteRiskLimitsDetailsComponent},
  {path: 'quote-risk-limits-edit/:id', component: QuoteRiskLimitsEditComponent},

  {path: 'ids', component: IdsComponent},
  {path: 'benefits', component: BenefitsComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'loadings', component: LoadingsComponent},
  {path: 'commissions', component: CommissionsComponent},
  {path: 'policies', component: PoliciesComponent},
  {path: 'policy-add', component: PolicyAddComponent},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
 