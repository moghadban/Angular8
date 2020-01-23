import { Injectable } from '@angular/core';
import { List } from './list';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  //endpoint: string = 'http://localhost:4200/api';

   endpoint: string = 'http://localhost:3000/api';
  //endpoint: string = 'api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add Entry
  AddEntry(data: List): Observable<any> {
    let API_URL = `${this.endpoint}/add-entry`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Entrys
  GetEntries() {
    return this.http.get(`${this.endpoint}/add-entry`);
  }

  // Get student
  GetEntry(id): Observable<any> {
    let API_URL = `${this.endpoint}/add-entry/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Entry
  UpdateEntry(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/add-entry/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Entry
  DeleteEntry(id): Observable<any> {
    var API_URL = `${this.endpoint}/add-entry/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
