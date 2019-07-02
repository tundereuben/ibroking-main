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

import { Client } from '../models/Client';

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

  getClause(id: number): Observable<Clause> {
    const url = `${this.clausesUrl}/${id}`;
    return this.http.get<Clause>(url);
  }

  addClause(newClause: Clause): Observable<Clause> {
    console.log(newClause);
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
}
