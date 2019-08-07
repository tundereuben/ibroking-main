import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Quotation } from '../models/Quotation';
import { QuoteProduct } from '../models/QuoteProduct';
import { QuoteRisk } from '../models/QuoteRisk';
import { QuoteRiskLimit } from '../models/QuoteRiskLimit';
import { DEFAULT_HEADERS } from '../models/authorization'; 

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  quotations: Observable<Quotation[]>;
  quotation: Observable<Quotation>;
  
  quoteProducts: Observable<QuoteProduct[]>;
  quoteProduct: Observable<QuoteProduct>;

  products: Observable<QuoteProduct[]>;
  product: Observable<QuoteProduct>;

  quoteRisks: Observable<QuoteRisk[]>; 
  quoteRisk: Observable<QuoteRisk>;

  quoteRiskLimits: Observable<QuoteRiskLimit[]>;
  quoteRiskLimit: Observable<QuoteRiskLimit>;
  
  constructor(private http: HttpClient) { 

  }

  // API CALLS & httpOptions
  quotationUrl = 'http://localhost:8080/api/quotations';
  quoteProductUrl = 'http://localhost:8080/api/quotproducts';
  quoteRiskUrl = 'http://localhost:8080/api/quotrisks';
  quoteRiskLimitUrl = 'http://localhost:8080/api/quotrisklimits';

httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
      if(error.error instanceof ErrorEvent) {
          console.log('An error occured:', error.error.message);
      } else {
          console.log(
              `Backend returned code ${error.status} ` +
              `body was: ${error.error}`
          );
      }
      return throwError(
          'Something bad happened; please try again later.'
      );
  }
 

  // =========================== //
  // ==== QUOTATION DETAILS FUNCTIONS ====== //
  // =========================== //

  /** GET quotations */
  getQuotations(): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(this.quotationUrl);
  }

   /** GET quotation by id. Will 404 if id not found */
   getQuotation(id: number): Observable<Quotation> {
    const url = `${this.quotationUrl}/${id}`;
    return this.http.get<Quotation>(url);
  }

  /** POST: add a new class to the server */
  addQuotation(newQuotation: Quotation): Observable<Quotation> {
    return this.http.post<Quotation>(this.quotationUrl, newQuotation, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }

  /** PUT:  */
  updateQuotation(updatedQuotation: Quotation): Observable<Quotation> {
    const url = `${this.quotationUrl}/${updatedQuotation.quotCode}`;
    return this.http.put(url, updatedQuotation, this.httpOptions);
  }

  /** DELETE:  */
  deleteQuotation(quotation: Quotation) {
    const url = `${this.quotationUrl }/${quotation.quotCode}`;
    console.log(url);
    return this.http.delete(url, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
    // return this.http.delete(this.quotationUrl + "/" + quotation.quotCode);
  }

  // ++++++++++ QUOTATION DETAILS FUNCTIONS ENDS ++++++++++ //
  


    // =========================== //
  // ==== QUOTE PRODUCT FUNCTIONS ====== //
  // =========================== //
  /** GET quote products. Will 404 if id not found */
  getQuoteProducts(): Observable<QuoteProduct[]> {
    return this.http.get<QuoteProduct[]>(this.quoteProductUrl);
  }

   /** GET quote product by id. Will 404 if id not found */
   getQuoteProduct(id: number): Observable<QuoteProduct> {
    const url = `${this.quoteProductUrl}/${id}`;
    return this.http.get<QuoteProduct>(url);
  }

  /** POST: add a new quoteProduct to the server */
  addQuoteProduct(newQuoteProduct: QuoteProduct): Observable<QuoteProduct> {
    return this.http.post<QuoteProduct>(this.quoteProductUrl, newQuoteProduct, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );;
  }

  /** PUT:  */
  updateQuoteProduct(updatedQuoteProduct: QuoteProduct): Observable<QuoteProduct> {
    const url = `${this.quoteProductUrl}/${updatedQuoteProduct.qpCode}`;
    console.log(url);
    return this.http.put(url, updatedQuoteProduct, this.httpOptions);
  }

  /** DELETE:  */
  deleteQuoteProduct(id: number) {
    const url = `${this.quoteProductUrl }/${id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }

  // ++++++++++ QUOTE PRODUCTS FUNCTIONS ENDS ++++++++++ //



   // =========================== //
  // ==== QUOTE RISK FUNCTIONS ====== //
  // =========================== //

  getQuoteRisks(): Observable<QuoteRisk[]> {
    return this.http.get<QuoteRisk[]>(this.quoteRiskUrl);
  }

   /** GET quote Risk by id. Will 404 if id not found */
   getQuoteRisk(id: number): Observable<QuoteRisk> {
    const url = `${this.quoteRiskUrl}/${id}`;
    return this.http.get<QuoteRisk>(url);
  }

  /** POST: add a new quoteRisk to the server */
  addQuoteRisk(newQuoteRisk: QuoteRisk): Observable<QuoteRisk> {
    return this.http.post<QuoteRisk>(this.quoteRiskUrl, JSON.stringify(newQuoteRisk), {headers: DEFAULT_HEADERS});
  }

   /** PUT:  */
   updateQuoteRisk(updatedQuoteRisk: QuoteRisk): Observable<QuoteRisk> {
    const url = `${this.quoteRiskUrl}/${updatedQuoteRisk.qrCode}`; 
    console.log(url);
    return this.http.put(url, updatedQuoteRisk, this.httpOptions);
  }

  /** DELETE:  */
  deleteQuoteRisk(id: number) {
    const url = `${this.quoteRiskUrl }/${id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }



   // =========================== //
  // ==== QUOTE RISK LIMTITS FUNCTIONS ====== //
  // =========================== //
  getQuoteRiskLimits(): Observable<QuoteRiskLimit[]> {
    return this.http.get<QuoteRiskLimit[]>(this.quoteRiskLimitUrl);
  }

   /** GET quote RiskLimit by id. Will 404 if id not found */
   getQuoteRiskLimit(id: number): Observable<QuoteRiskLimit> {
    const url = `${this.quoteRiskLimitUrl}/${id}`;
    return this.http.get<QuoteRiskLimit>(url);
  }

  /** POST: add a new quoteRiskLimit to the server */
  addQuoteRiskLimit(newQuoteRiskLimit: QuoteRiskLimit): Observable<QuoteRiskLimit> {
    return this.http.post<QuoteRiskLimit>(this.quoteRiskLimitUrl, JSON.stringify(newQuoteRiskLimit), {headers: DEFAULT_HEADERS});
  }

   /** PUT:  */
   updateQuoteRiskLimit(updatedQuoteRiskLimit: QuoteRiskLimit): Observable<QuoteRiskLimit> {
    const url = `${this.quoteRiskLimitUrl}/${updatedQuoteRiskLimit.qrlCode}`;
    return this.http.put<QuoteRiskLimit>(url, updatedQuoteRiskLimit, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }

  /** DELETE:  */
  deleteQuoteRiskLimit(id: number): Observable<{}> {
    const url = `${this.quoteRiskLimitUrl }/${id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
        catchError(this.handleError)
    );
  }
  // ++++++++++ QUOTE RISK LIMITS FUNCTIONS ENDS ++++++++++ //
  
  
  // ++++++++++ API FETCHES ++++++++++ //
//   getProducts(): Observable<QuoteProduct[]> {
//     // Get quotationses with the id
//    this.products = this.productsCollection.snapshotChanges().pipe(
//      map(actions => actions.map(a => {
//        const data = a.payload.doc.data() as QuoteProduct;
//        data.id = a.payload.doc.id; 
//        return data; 
//       //  console.log(data);
//      }))
//    )
//     return this.products;
//   };

currencies = ['NGN', 'USD', 'GBP'];
  
}
