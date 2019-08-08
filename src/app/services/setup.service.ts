import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { setupClass } from '../models/Class';
import { Subclass } from '../models/Subclass';
import { Product } from '../models/Product';
import { Clause } from '../models/Clause';
import { Section } from '../models/Section';
import { Covertype } from '../models/Covertype';
import { Id } from '../models/Id';
import { Policy } from '../models/Policy';
import { Loading } from '../models/Loading';
import { Commission } from '../models/Commission';
import { Extension } from '../models/Extension';
import { Benefit } from '../models/Benefit';
import { Discount } from '../models/Discount';
import { Rate } from '../models/Rate';

import { Client } from '../models/Client';
import { Underwriter } from '../models/Underwriter';

import { DEFAULT_HEADERS } from '../models/authorization';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  // classesCollection: AngularFirestoreCollection<setupClass>;
  // classDoc: AngularFirestoreDocument<setupClass>;
  classes: Observable<setupClass[]>;
  class: Observable<setupClass>; 

  // subclassesCollection: AngularFirestoreCollection<Subclass>;
  // subclassDoc: AngularFirestoreDocument<Subclass>;
  subclasses: Observable<Subclass[]>;
  subclass: Observable<Subclass>;

  // productsCollection: AngularFirestoreCollection<Product>;
  // productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;

  // clausesCollection: AngularFirestoreCollection<Clause>;
  // clauseDoc: AngularFirestoreDocument<Clause>;
  clauses: Observable<Clause[]>;
  clause: Observable<Clause>;

  // sectionsCollection: AngularFirestoreCollection<Section>;
  // sectionDoc: AngularFirestoreDocument<Section>;
  sections: Observable<Section[]>;
  section: Observable<Section>;

  // covertypesCollection: AngularFirestoreCollection<Covertype>;
  // covertypeDoc: AngularFirestoreDocument<Covertype>;
  covertypes: Observable<Covertype[]>;
  covertype: Observable<Covertype>;

  ids: Observable<Id[]>;
  id: Observable<Id>;

  constructor(
    // private afs: AngularFirestore,
    private http: HttpClient ) { 
    // this.classesCollection = this.afs.collection('classes', ref => ref.orderBy('code','asc'));
    // this.subclassesCollection = this.afs.collection('subclass', ref => ref.orderBy('code','asc'));
    // this.productsCollection = this.afs.collection('product',  ref => ref.orderBy('code','asc'));
    // this.clausesCollection = this.afs.collection('clause',  ref => ref.orderBy('code','asc'));
    // this.sectionsCollection = this.afs.collection('section',  ref => ref.orderBy('code','asc'));
    // this.covertypesCollection = this.afs.collection('covertype',  ref => ref.orderBy('code','asc'));
  };

  // API CALLS & httpOptions
  // classesUrl = 'api/classes';
  // subclassesUrl = 'api/subclasses';
  // productsUrl = 'api/products';
  // covertypesUrl = 'api/covertypes';
  // sectionsUrl = 'api/sections';
  // clausesUrl = 'api/clauses';

  classesUrl = 'http://localhost:8080/api/classes';
  subclassesUrl = 'http://localhost:8080/api/subclasses';
  productsUrl = 'http://localhost:8080/api/products';
  covertypesUrl = 'http://localhost:8080/api/covertypes';
  sectionsUrl = 'http://localhost:8080/api/sections';
  clausesUrl = 'http://localhost:8080/api/clauses';
  clientsUrl = 'http://localhost:8080/api/clients';
  idsUrl = 'http://localhost:8080/api/ids';
  policiesUrl = 'http://localhost:8080/api/policies';
  discountsUrl = 'http://localhost:8080/api/discounts';
  loadingsUrl = 'http://localhost:8080/api/loadings';
  commissionsUrl = 'http://localhost:8080/api/commissions';
  extensionsUrl = 'http://localhost:8080/api/extensions';
  benefitsUrl = 'http://localhost:8080/api/benefits';
  ratesUrl = 'http://localhost:8080/api/rates';
  underwritersUrl = 'http://localhost:8080/api/underwriters';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
 

  // Error handler
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> =>  {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }


  // =========================== //
  // ==== CLASS FUNCTIONS ====== //
  // =========================== //

  /** GET classes. Will 404 if id not found */
  getClasses(): Observable<setupClass[]> {
    return this.http.get<setupClass[]>(this.classesUrl);
  }

  /** GET class by id. Will 404 if id not found */
  getClass(id: number): Observable<setupClass> {
    const url = `${this.classesUrl}/${id}`;
    return this.http.get<setupClass>(url);
  }

  /** POST: add a new class to the server */
  addClass(newClass: setupClass): Observable<setupClass> {
    return this.http.post<setupClass>('/api/classes', JSON.stringify(newClass), {headers: DEFAULT_HEADERS});
  }

  /** PUT:  */
  updateClass(updatedClass: setupClass): Observable<setupClass> {
    const url = `${this.classesUrl}/${updatedClass.claCode}`;
    return this.http.put(url, updatedClass, this.httpOptions).pipe(
      tap(_ => console.log(`updated class code = ${updatedClass.claCode}`)),
      catchError(this.handleError<any>('updateClass'))
    );
  }

  /** DELETE:  */
  deleteClass(_class: setupClass) {
    return this.http.delete(this.classesUrl + "/" + _class.claCode);
  }

  // ++++++++++ CLASS FUNCTIONS ENDS ++++++++++ //
 


  // =========================== //
  // ==== SUBCLASS FUNCTIONS ====== //
  // =========================== //

  getSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(this.subclassesUrl);
  }
  
  getSubclass(id: number): Observable<Subclass> {
    const url = `${this.subclassesUrl}/${id}`;
    return this.http.get<Subclass>(url);
  }

  getSubclassesByPolCode(id: number):Observable<Subclass[]>{
    const url = `${this.subclassesUrl}/polCode?polCode=${id}`;
    return this.http.get<Subclass[]>(url);
  }

  addSubclass(newSubclass: Subclass): Observable<Subclass> {
    console.log(newSubclass);
    return this.http.post<Subclass>(this.subclassesUrl, JSON.stringify(newSubclass), {headers: DEFAULT_HEADERS});
  }

  updateSubclass(updatedSubclass: Subclass): Observable<Subclass> {
    const url = `${this.subclassesUrl}/${updatedSubclass.sclCode}`;
    return this.http.put(url, updatedSubclass, this.httpOptions).pipe(
      tap(_ => console.log(`updated subclass code = ${updatedSubclass.sclCode}`)),
      catchError(this.handleError<any>('updateSubclass'))
    );
  }

  deleteSubclass(subclass: Subclass) {
    return this.http.delete(this.subclassesUrl + "/" + subclass.sclCode);
  }


  // +++++++ SUBCLASS FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== PRODUCTS FUNCTIONS ====== //
  // =========================== //

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
  
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  addProduct(newProduct: Product): Observable<Product> {
    console.log(newProduct);
    return this.http.post<Product>(this.productsUrl, JSON.stringify(newProduct), {headers: DEFAULT_HEADERS});
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    const url = `${this.productsUrl}/${updatedProduct.proCode}`;
    return this.http.put(url, updatedProduct, this.httpOptions).pipe(
      tap(_ => console.log(`updated product code = ${updatedProduct.proCode}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.productsUrl + "/" + product.proCode);
  }
  // +++++++ PRODUCT FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== CLAUSES FUNCTIONS ====== //
  // =========================== //

  
  getClauses(): Observable<Clause[]> {
    return this.http.get<Clause[]>(this.clausesUrl);
  }

  getClausesByPolCode(id: number):Observable<Clause[]>{
    const url = `${this.clausesUrl}/polCode?polCode=${id}`;
    return this.http.get<Clause[]>(url);
  }

  getClausesBySubclassCode(id: number):Observable<Clause[]>{
    const url = `${this.clausesUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Clause[]>(url);
  }

  getClause(id: number): Observable<Clause> {
    const url = `${this.clausesUrl}/${id}`;
    return this.http.get<Clause>(url);
  }

  addClause(newClause: Clause): Observable<Clause> {
    return this.http.post<Clause>(this.clausesUrl, JSON.stringify(newClause), {headers: DEFAULT_HEADERS});
  }

  updateClause(updatedClause: Clause): Observable<Clause> {
    const url = `${this.clausesUrl}/${updatedClause.clsCode}`;
    return this.http.put(url, updatedClause, this.httpOptions).pipe(
      tap(_ => console.log(`updated clause code = ${updatedClause.clsCode}`)),
      catchError(this.handleError<any>('updateClause'))
    );
  }

  deleteClause(clause: Clause) {
    return this.http.delete(this.clausesUrl + "/" + clause.clsCode);
  }
  // +++++++ CLAUSES FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ====  SECTIONS FUNCTIONS ====== //
  // =========================== //

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl);
  }

  getSection(id: number): Observable<Section> {
    const url = `${this.sectionsUrl}/${id}`;
    return this.http.get<Section>(url);
  }

  addSection(newSection: Section): Observable<Section> {
    return this.http.post<Section>(this.sectionsUrl, JSON.stringify(newSection), {headers: DEFAULT_HEADERS});
  }

  updateSection(updatedSection: Section): Observable<Section> {
    const url = `${this.sectionsUrl}/${updatedSection.sectCode}`;
    return this.http.put(url, updatedSection, this.httpOptions).pipe(
      tap(_ => console.log(`updated Section code = ${updatedSection.sectCode}`)),
      catchError(this.handleError<any>('updateSection'))
    );
  }

  deleteSection(section: Section) {
    return this.http.delete(this.sectionsUrl + "/" + section.sectCode);
  }
  // +++++++ SECTIONS FUNCTIONS ENDS ++++++++ //



  // =========================== //
  // ==== COVERTYPES FUNCTIONS ====== //
  // =========================== //

  getCovertypes(): Observable<Covertype[]> {
    return this.http.get<Covertype[]>(this.covertypesUrl);
  }
  
  getCovertype(id: number): Observable<Covertype> {
    const url = `${this.covertypesUrl}/${id}`;
    return this.http.get<Covertype>(url);
  }

  addCovertype(newCovertype: Covertype): Observable<Covertype> {
    return this.http.post<Covertype>(this.covertypesUrl, JSON.stringify(newCovertype), {headers: DEFAULT_HEADERS});
  }

  updateCovertype(updatedCovertype: Covertype): Observable<Covertype> {
    console.log(updatedCovertype);
    const url = `${this.covertypesUrl}/${updatedCovertype.covtCode}`;
    return this.http.put(url, updatedCovertype, this.httpOptions).pipe(
      tap(_ => console.log(`updated covertype code = ${updatedCovertype.covtCode}`)),
      catchError(this.handleError<any>('updateCovertype'))
    );
  }

  deleteCovertype(covertype: Covertype) {
    return this.http.delete(this.covertypesUrl + "/" + covertype.covtCode);
  }
  // +++++++ COVERTYPES FUNCTIONS ENDS ++++++++ //

// =========================== //
  // ==== POLICY FUNCTIONS ====== //
  // =========================== // 

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.policiesUrl);
  }
  
  getPolicy(id: number): Observable<Policy> {
    const url = `${this.policiesUrl}/${id}`;
    return this.http.get<Policy>(url);
  }

  addPolicy(newPolicy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.policiesUrl, JSON.stringify(newPolicy), {headers: DEFAULT_HEADERS});
  }

  updatePolicy(updatedPolicy: Policy): Observable<Policy> {
    const url = `${this.policiesUrl}/${updatedPolicy.polCode}`;
    return this.http.put(url, updatedPolicy, this.httpOptions).pipe(
      tap(_ => console.log(`updated policy code = ${updatedPolicy.polCode}`)),
      catchError(this.handleError<any>('updatePolicy'))
    );
  }

  deletePolicy(policy: Policy) {
    return this.http.delete(this.policiesUrl + "/" + policy.polCode);
  }
  // +++++++ POLICY FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== CLIENT FUNCTIONS ====== //
  // =========================== //

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }
  
  getClient(id: number): Observable<Client> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  addClient(newClient: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsUrl, JSON.stringify(newClient), {headers: DEFAULT_HEADERS});
  }

  updateClient(updatedClient: Client): Observable<Client> {
    const url = `${this.clientsUrl}/${updatedClient.clntCode}`;
    return this.http.put(url, updatedClient, this.httpOptions).pipe(
      tap(_ => console.log(`updated client code = ${updatedClient.clntCode}`)),
      catchError(this.handleError<any>('updatedClient'))
    );
  }

  deleteClient(client: Client) {
    return this.http.delete(this.clientsUrl + "/" + client.clntCode);
  }
  // +++++++ CLIENT FUNCTIONS ENDS ++++++++ //

  // =========================== //
  // ==== UNDERWRITER FUNCTIONS ====== //
  // =========================== //

  getUnderwriters(): Observable<Underwriter[]> {
    return this.http.get<Underwriter[]>(this.underwritersUrl);
  }
  
  getUnderwriter(id: number): Observable<Underwriter> {
    const url = `${this.underwritersUrl}/${id}`;
    return this.http.get<Underwriter>(url);
  }

  addUnderwriter(newUnderwriter: Underwriter): Observable<Underwriter> {
    return this.http.post<Underwriter>(this.underwritersUrl, JSON.stringify(newUnderwriter), {headers: DEFAULT_HEADERS});
  }

  updateUnderwriter(updatedUnderwriter: Underwriter): Observable<Underwriter> {
    const url = `${this.underwritersUrl}/${updatedUnderwriter.undCode}`;
    return this.http.put(url, updatedUnderwriter, this.httpOptions).pipe(
      tap(_ => console.log(`updated underwriter code = ${updatedUnderwriter.undCode}`)),
      catchError(this.handleError<any>('updatedUnderwriter'))
    );
  }

  deleteUnderwriter(underwriter: Underwriter) {
    return this.http.delete(this.underwritersUrl + "/" + underwriter.undCode);
  }
  // +++++++ UNDERWRITER FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== IDs FUNCTIONS ====== //
  // =========================== //
  getIds(): Observable<Id[]> {
    return this.http.get<Id[]>(this.idsUrl);
  }

  getIdsByPolCode(id: number):Observable<Id[]>{
    const url = `${this.idsUrl}/polCode?polCode=${id}`;
    return this.http.get<Id[]>(url);
  }

  getIdsBySubclassCode(id: number):Observable<Id[]>{
    const url = `${this.idsUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Id[]>(url);
  }
    
  getId(id: number): Observable<Id> {
    const url = `${this.idsUrl}/${id}`;
    return this.http.get<Id>(url);
  }

  addId(newId: Id): Observable<Id> {
    return this.http.post<Id>(this.idsUrl, JSON.stringify(newId), {headers: DEFAULT_HEADERS});
  }

  updateId(updatedId: Id): Observable<Id> {
    const url = `${this.idsUrl}/${updatedId.idCode}`;
    return this.http.put(url, updatedId, this.httpOptions).pipe(
      tap(_ => console.log(`updated id code = ${updatedId.idCode}`)),
      catchError(this.handleError<any>('updateId'))
    );
  }

  deleteId(id: Id) {
    return this.http.delete(this.idsUrl + "/" + id.idCode);
  }
  // +++++++ IDs FUNCTIONS ENDS ++++++++ //

  
  // =========================== //
  // ==== RATES FUNCTIONS ====== //
  // =========================== //
  getRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.ratesUrl);
  }

  getRatesByPolCode(id: number):Observable<Rate[]>{
    const url = `${this.ratesUrl}/polCode?polCode=${id}`;
    return this.http.get<Rate[]>(url);
  }

  getRatesBySubclassCode(id: number):Observable<Rate[]>{
    const url = `${this.ratesUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Rate[]>(url);
  }
    
  getRate(id: number): Observable<Rate> {
    const url = `${this.ratesUrl}/${id}`;
    return this.http.get<Rate>(url);
  }

  addRate(newRate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.ratesUrl, JSON.stringify(newRate), {headers: DEFAULT_HEADERS});
  }

  updateRate(updatedRate: Rate): Observable<Rate> {
    const url = `${this.ratesUrl}/${updatedRate.rateCode}`;
    return this.http.put(url, updatedRate, this.httpOptions).pipe(
      tap(_ => console.log(`updated rate code = ${updatedRate.rateCode}`)),
      catchError(this.handleError<any>('updateRate'))
    );
  }

  deleteRate(rate: Rate) {
    return this.http.delete(this.ratesUrl + "/" + rate.rateCode);
  }
  // +++++++ RATES FUNCTIONS ENDS ++++++++ //

  // =========================== //
  // ==== DISCOUNTS FUNCTIONS ====== //
  // =========================== //
  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(this.discountsUrl);
  }

  getDiscountsByPolCode(id: number):Observable<Discount[]>{
    const url = `${this.discountsUrl}/polCode?polCode=${id}`;
    return this.http.get<Discount[]>(url);
  }

  getDiscountsBySubclassCode(id: number):Observable<Discount[]>{
    const url = `${this.discountsUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Discount[]>(url);
  }
    
  getDiscount(id: number): Observable<Id> {
    const url = `${this.discountsUrl}/${id}`;
    return this.http.get<Id>(url);
  }

  addDiscount(newDiscount: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.discountsUrl, JSON.stringify(newDiscount), {headers: DEFAULT_HEADERS});
  }

  updateDiscount(updatedDiscount: Discount): Observable<Discount> {
    const url = `${this.discountsUrl}/${updatedDiscount.dsctCode}`;
    return this.http.put(url, updatedDiscount, this.httpOptions).pipe(
      tap(_ => console.log(`updated discounts code = ${updatedDiscount.dsctCode}`)),
      catchError(this.handleError<any>('updateDiscount'))
    );
  }

  deleteDiscount(discount: Discount) {
    return this.http.delete(this.discountsUrl + "/" + discount.dsctCode);
  }
  // +++++++ DISCOUNTS FUNCTIONS ENDS ++++++++ //

  // =========================== //
  // ==== LOADING FUNCTIONS ====== //
  // =========================== //
  getLoadings(): Observable<Loading[]> {
    return this.http.get<Loading[]>(this.loadingsUrl);
  }

  getLoadingsByPolCode(id: number):Observable<Loading[]>{
    const url = `${this.loadingsUrl}/polCode?polCode=${id}`;
    return this.http.get<Loading[]>(url);
  }

  getLoadingsBySubclassCode(id: number):Observable<Loading[]>{
    const url = `${this.loadingsUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Loading[]>(url);
  }
    
  getLoading(id: number): Observable<Loading> {
    const url = `${this.loadingsUrl}/${id}`;
    return this.http.get<Loading>(url);
  }

  addLoading(newLoading: Loading): Observable<Loading> {
    return this.http.post<Loading>(this.loadingsUrl, JSON.stringify(newLoading), {headers: DEFAULT_HEADERS});
  }

  updateLoading(updatedLoading: Loading): Observable<Loading> {
    const url = `${this.loadingsUrl}/${updatedLoading.loadCode}`;
    return this.http.put(url, updatedLoading, this.httpOptions).pipe(
      tap(_ => console.log(`updated loadings code = ${updatedLoading.loadCode}`)),
      catchError(this.handleError<any>('updateLoading'))
    );
  }

  deleteLoading(loading: Loading) {
    return this.http.delete(this.loadingsUrl + "/" + loading.loadCode);
  }
  // +++++++ LOADING FUNCTIONS ENDS ++++++++ //

  // =========================== //
  // ==== COMMISSION FUNCTIONS ====== //
  // =========================== //
  getCommissions(): Observable<Commission[]> {
    return this.http.get<Commission[]>(this.commissionsUrl);
  }

  getCommissionsByPolCode(id: number):Observable<Commission[]>{
    const url = `${this.commissionsUrl}/polCode?polCode=${id}`;
    return this.http.get<Commission[]>(url);
  }

  getCommissionsBySubclassCode(id: number):Observable<Commission[]>{
    const url = `${this.commissionsUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Commission[]>(url);
  }
    
  getCommission(id: number): Observable<Commission> {
    const url = `${this.commissionsUrl}/${id}`;
    return this.http.get<Commission>(url);
  }

  addCommission(newCommission: Commission): Observable<Commission> {
    return this.http.post<Commission>(this.commissionsUrl, JSON.stringify(newCommission), {headers: DEFAULT_HEADERS});
  }

  updateCommission(updatedCommission: Commission): Observable<Commission> {
    const url = `${this.commissionsUrl}/${updatedCommission.commCode}`;
    return this.http.put(url, updatedCommission, this.httpOptions).pipe(
      tap(_ => console.log(`updated Commissions code = ${updatedCommission.commCode}`)),
      catchError(this.handleError<any>('updateCommission'))
    );
  }

  deleteCommission(commission: Commission) {
    return this.http.delete(this.commissionsUrl + "/" + commission.commCode);
  }
  // +++++++ COMMISSION FUNCTIONS ENDS ++++++++ //

   // =========================== //
  // ==== EXTENSION FUNCTIONS ====== //
  // =========================== //
  getExtensions(): Observable<Extension[]> {
    return this.http.get<Extension[]>(this.extensionsUrl);
  }

  getExtensionsByPolCode(id: number):Observable<Extension[]>{
    const url = `${this.extensionsUrl}/polCode?polCode=${id}`;
    return this.http.get<Extension[]>(url);
  }

  getExtensionsBySubclassCode(id: number):Observable<Extension[]>{
    const url = `${this.extensionsUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Extension[]>(url);
  }
    
  getExtension(id: number): Observable<Extension> {
    const url = `${this.extensionsUrl}/${id}`;
    return this.http.get<Extension>(url);
  }

  addExtension(newExtension: Extension): Observable<Extension> {
    return this.http.post<Extension>(this.extensionsUrl, JSON.stringify(newExtension), {headers: DEFAULT_HEADERS});
  }

  updateExtension(updatedExtension: Extension): Observable<Extension> {
    const url = `${this.extensionsUrl}/${updatedExtension.extCode}`;
    return this.http.put(url, updatedExtension, this.httpOptions).pipe(
      tap(_ => console.log(`updated Extensions code = ${updatedExtension.extCode}`)),
      catchError(this.handleError<any>('updateExtension'))
    );
  }

  deleteExtension(extension: Extension) {
    return this.http.delete(this.extensionsUrl + "/" + extension.extCode);
  }
  // +++++++ EXTENSION FUNCTIONS ENDS ++++++++ //

  // =========================== //
  // ==== BENEFIT FUNCTIONS ====== //
  // =========================== //
  getBenefits(): Observable<Benefit[]> {
    return this.http.get<Benefit[]>(this.benefitsUrl);
  }

  getBenefitsByPolCode(id: number):Observable<Benefit[]>{
    const url = `${this.benefitsUrl}/polCode?polCode=${id}`;
    return this.http.get<Benefit[]>(url);
  }

  getBenefitsBySubclassCode(id: number):Observable<Benefit[]>{
    const url = `${this.benefitsUrl}/sclCode?sclCode=${id}`;
    return this.http.get<Benefit[]>(url);
  }
    
  getBenefit(id: number): Observable<Benefit> {
    const url = `${this.benefitsUrl}/${id}`;
    return this.http.get<Benefit>(url);
  }

  addBenefit(newBenefit: Benefit): Observable<Benefit> {
    return this.http.post<Benefit>(this.benefitsUrl, JSON.stringify(newBenefit), {headers: DEFAULT_HEADERS});
  }

  updateBenefit(updatedBenefit: Benefit): Observable<Benefit> {
    const url = `${this.benefitsUrl}/${updatedBenefit.bftCode}`;
    return this.http.put(url, updatedBenefit, this.httpOptions).pipe(
      tap(_ => console.log(`updated Benefits code = ${updatedBenefit.bftCode}`)),
      catchError(this.handleError<any>('updateBenefits'))
    );
  }

  deleteBenefit(benefit: Benefit) {
    return this.http.delete(this.benefitsUrl + "/" + benefit.bftCode);
  }
  // +++++++ BENEFIT FUNCTIONS ENDS ++++++++ //

}

