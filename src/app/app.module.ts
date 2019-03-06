import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ClassComponent } from './components/setups/class/class.component';
import { SubclassComponent } from './components/setups/subclass/subclass.component';
import { ProductsComponent } from './components/setups/products/products.component';
import { ClausesComponent } from './components/setups/clauses/clauses.component';
import { SectionsComponent } from './components/setups/sections/sections.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClassEditComponent } from './components/setups/class-edit/class-edit.component';
import { ClassDetailsComponent } from './components/setups/class-details/class-details.component';
import { ClassAddComponent } from './components/setups/class-add/class-add.component';
import { ClauseAddComponent } from './components/setups/clause-add/clause-add.component';
import { ClauseDetailsComponent } from './components/setups/clause-details/clause-details.component';
import { ClauseEditComponent } from './components/setups/clause-edit/clause-edit.component';
import { ProductAddComponent } from './components/setups/product-add/product-add.component';
import { ProductEditComponent } from './components/setups/product-edit/product-edit.component';
import { ProductDetailsComponent } from './components/setups/product-details/product-details.component';
import { SectionAddComponent } from './components/setups/section-add/section-add.component';
import { SectionDetailsComponent } from './components/setups/section-details/section-details.component';
import { SectionEditComponent } from './components/setups/section-edit/section-edit.component';
import { SubclassAddComponent } from './components/setups/subclass-add/subclass-add.component';
import { SubclassEditComponent } from './components/setups/subclass-edit/subclass-edit.component';
import { SubclassDetailsComponent } from './components/setups/subclass-details/subclass-details.component';
import { SetupService } from './services/setup.service';
import { CovertypesComponent } from './components/setups/covertypes/covertypes.component';
import { CovertypeAddComponent } from './components/setups/covertype-add/covertype-add.component';
import { CovertypeEditComponent } from './components/setups/covertype-edit/covertype-edit.component';
import { CovertypeDetailsComponent } from './components/setups/covertype-details/covertype-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    FooterComponent,
    ClassComponent,
    SubclassComponent,
    ProductsComponent,
    ClausesComponent,
    SectionsComponent,
    NotFoundComponent,
    ClassEditComponent,
    ClassDetailsComponent,
    ClassAddComponent,
    ClauseAddComponent,
    ClauseDetailsComponent,
    ClauseEditComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductDetailsComponent,
    SectionAddComponent,
    SectionDetailsComponent,
    SectionEditComponent,
    SubclassAddComponent,
    SubclassEditComponent,
    SubclassDetailsComponent,
    CovertypesComponent,
    CovertypeAddComponent,
    CovertypeEditComponent,
    CovertypeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'ibroking-main'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [SetupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
