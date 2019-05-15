import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 

import { setupClass } from '../models/Class';
import { Subclass } from '../models/Subclass';
import { Product } from '../models/Product';
import { Clause } from '../models/Clause';
import { Section } from '../models/Section';
import { Covertype } from '../models/Covertype';
import { DEFAULT_HEADERS } from '../models/authorization';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  classesCollection: AngularFirestoreCollection<setupClass>;
  classDoc: AngularFirestoreDocument<setupClass>;
  classes: Observable<setupClass[]>;
  class: Observable<setupClass>; 

  subclassesCollection: AngularFirestoreCollection<Subclass>;
  subclassDoc: AngularFirestoreDocument<Subclass>;
  subclasses: Observable<Subclass[]>;
  subclass: Observable<Subclass>;

  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;

  clausesCollection: AngularFirestoreCollection<Clause>;
  clauseDoc: AngularFirestoreDocument<Clause>;
  clauses: Observable<Clause[]>;
  clause: Observable<Clause>;

  sectionsCollection: AngularFirestoreCollection<Section>;
  sectionDoc: AngularFirestoreDocument<Section>;
  sections: Observable<Section[]>;
  section: Observable<Section>;

  covertypesCollection: AngularFirestoreCollection<Covertype>;
  covertypeDoc: AngularFirestoreDocument<Covertype>;
  covertypes: Observable<Covertype[]>;
  covertype: Observable<Covertype>;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient ) { 
    // this.classesCollection = this.afs.collection('classes', ref => ref.orderBy('code','asc'));
    this.subclassesCollection = this.afs.collection('subclass', ref => ref.orderBy('code','asc'));
    this.productsCollection = this.afs.collection('product',  ref => ref.orderBy('code','asc'));
    this.clausesCollection = this.afs.collection('clause',  ref => ref.orderBy('code','asc'));
    this.sectionsCollection = this.afs.collection('section',  ref => ref.orderBy('code','asc'));
    this.covertypesCollection = this.afs.collection('covertype',  ref => ref.orderBy('code','asc'));
  };

  // API CALLS
  classesUrl = 'api/classes';

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

  // getClasses(): Observable<Class[]> {
  //   // Get classes with the id
  //  this.classes = this.classesCollection.snapshotChanges().pipe(
  //    map(actions => actions.map(a => {
  //      const data = a.payload.doc.data() as Class;
  //      data.id = a.payload.doc.id; 
  //      return data; 
  //     //  console.log(data);
  //    }))
  //  )
  //   return this.classes;
  // }

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

  

  // newClass(newClass) {
  //   // this.classesCollection.add(newClass);
    
  //   var xmlhttp = new XMLHttpRequest();
  //   xmlhttp.open("POST", this.addClassUrl, true);
  //   // xmlhttp.setRequestHeader("Content-type"," application/json");
  //   xmlhttp.onreadystatechange = () => {
  //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) alert (xmlhttp.responseText);
  //   }
  //   xmlhttp.send(JSON.parse(newClass));
  //   // console.log(newClass.cla_code);
  // }

  // getClass(id: string): Observable<Class> {
  //   this.classDoc = this.afs.doc<Class>(`classes/${id}`);
  //   this.class = this.classDoc.snapshotChanges().pipe(
  //     map(action => {
  //       if (action.payload.exists === false ) {
  //         return null;
  //       } else {
  //         const data = action.payload.data() as Class;
  //         data.id = action.payload.id;
  //         // console.log(data);
  //         return data;
  //       }
  //     })
  //   )
  //   return this.class;
  // }
  
  /** UPDATE: */
  // updateClass(updateClass: setupClass){
  //   this.classDoc = this.afs.doc(`classes/${updateClass.claCode}`);
  //   this.classDoc.update(updateClass);
  // }

  // deleteClass(deleteClass: Class) {
  //     this.classDoc = this.afs.doc(`classes/${deleteClass.claCode}`);
  //     this.classDoc.delete();
  // }

  
  // ++++++++++ CLASS FUNCTIONS ENDS ++++++++++ //
 


  // =========================== //
  // ==== SUBCLASS FUNCTIONS ====== //
  // =========================== //

  getSubclasses(): Observable<Subclass[]> {
    // Get subclasses with the id
   this.subclasses = this.subclassesCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Subclass;
       data.id = a.payload.doc.id; 
       return data; 
     }))
   )
    return this.subclasses;
  }

  newSubclass(newSubclass: Subclass) {
    this.subclassesCollection.add(newSubclass);
  }

  getSubclass(id: string): Observable<Subclass> {
    this.subclassDoc = this.afs.doc<Subclass>(`subclass/${id}`);
    this.subclass = this.subclassDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false ) {
          return null;
        } else {
          const data = action.payload.data() as Subclass;
          data.id = action.payload.id;
          // console.log(data);
          return data;
        }
      })
    )
    return this.subclass;
  }
  
  updateSubclass(updateSubclass: Subclass){
    this.subclassDoc = this.afs.doc(`subclass/${updateSubclass.id}`);
    this.subclassDoc.update(updateSubclass);
  }

  deleteSubclass(deleteSubclass: Subclass) {
      this.subclassDoc = this.afs.doc(`subclass/${deleteSubclass.id}`);
      this.subclassDoc.delete();
  }
  // +++++++ SUBCLASS FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== PRODUCTS FUNCTIONS ====== //
  // =========================== //

  getProducts(): Observable<Product[]> {
    // Get products with the id
   this.products = this.productsCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Product;
       data.id = a.payload.doc.id; 
       return data; 
     }))
   )
    return this.products;
  }

  newProduct(newProduct: Product) {
    this.productsCollection.add(newProduct);
  }

  getProduct(id: string): Observable<Product> {
    this.productDoc = this.afs.doc<Product>(`product/${id}`);
    this.product = this.productDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false ) {
          return null;
        } else {
          const data = action.payload.data() as Product;
          data.id = action.payload.id;
          // console.log(data);
          return data;
        }
      })
    )
    return this.product;
  }
  
  updateProduct(updateProduct: Product){
    this.productDoc = this.afs.doc(`product/${updateProduct.id}`);
    this.productDoc.update(updateProduct);
  }

  deleteProduct(deleteProduct: Product) {
      this.productDoc = this.afs.doc(`product/${deleteProduct.id}`);
      this.productDoc.delete();
  }
  // +++++++ PRODUCT FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== CLAUSES FUNCTIONS ====== //
  // =========================== //

  getClauses(): Observable<Clause[]> {
    // Get products with the id
   this.clauses = this.clausesCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Clause;
       data.id = a.payload.doc.id; 
       return data; 
     }))
   )
    return this.clauses;
  }

  newClause(newClause: Clause) {
    this.clausesCollection.add(newClause);
  }

  getClause(id: string): Observable<Clause> {
    this.clauseDoc = this.afs.doc<Clause>(`clause/${id}`);
    this.clause = this.clauseDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false ) {
          return null;
        } else {
          const data = action.payload.data() as Clause;
          data.id = action.payload.id;
          // console.log(data);
          return data;
        }
      })
    )
    return this.clause;
  }
  
  updateClause(updateClause: Clause){
    this.clauseDoc = this.afs.doc(`clause/${updateClause.id}`);
    this.clauseDoc.update(updateClause);
  }

  deleteClause(deleteClause: Clause) {
      this.clauseDoc = this.afs.doc(`clause/${deleteClause.id}`);
      this.clauseDoc.delete();
  }
  // +++++++ CLAUSES FUNCTIONS ENDS ++++++++ //


  // =========================== //
  // ==== CLAUSES SECTIONS ====== //
  // =========================== //

  getSections(): Observable<Section[]> {
    // Get section with the id
   this.sections = this.sectionsCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Section;
       data.id = a.payload.doc.id; 
       return data; 
     }))
   )
    return this.sections;
  }

  newSection(newSection: Section) {
    this.sectionsCollection.add(newSection);
  }

  getSection(id: string): Observable<Section> {
    this.sectionDoc = this.afs.doc<Section>(`section/${id}`);
    this.section = this.sectionDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false ) {
          return null;
        } else {
          const data = action.payload.data() as Section;
          data.id = action.payload.id;
          // console.log(data);
          return data;
        }
      })
    )
    return this.section;
  }
  
  updateSection(updateSection: Section){
    this.sectionDoc = this.afs.doc(`section/${updateSection.id}`);
    this.sectionDoc.update(updateSection);
  }

  deleteSection(deleteSection: Section) {
      this.sectionDoc = this.afs.doc(`section/${deleteSection.id}`);
      this.sectionDoc.delete();
  }
  // +++++++ SECTIONS FUNCTIONS ENDS ++++++++ //



  // =========================== //
  // ==== COVERTYPES SECTIONS ====== //
  // =========================== //

  getCovertypes(): Observable<Covertype[]> {
    // Get Covertype with the id
   this.covertypes = this.covertypesCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Covertype;
       data.id = a.payload.doc.id; 
       return data; 
     }))
   )
    return this.covertypes;
  }

  newCovertype(newCovertype: Covertype) {
    this.covertypesCollection.add(newCovertype);
  }

  getCovertype(id: string): Observable<Covertype> {
    this.covertypeDoc = this.afs.doc<Covertype>(`covertype/${id}`);
    this.covertype = this.covertypeDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false ) {
          return null;
        } else {
          const data = action.payload.data() as Covertype;
          data.id = action.payload.id;
          // console.log(data);
          return data;
        }
      })
    )
    return this.covertype;
  }
  
  updateCovertype(updateCovertype: Covertype){
    this.covertypeDoc = this.afs.doc(`covertype/${updateCovertype.id}`);
    this.covertypeDoc.update(updateCovertype);
  }

  deleteCovertype(deleteCovertype: Covertype) {
      this.covertypeDoc = this.afs.doc(`covertype/${deleteCovertype.id}`);
      this.covertypeDoc.delete();
  }
  // +++++++ COVERTYPES FUNCTIONS ENDS ++++++++ //
}
