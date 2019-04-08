import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private endpoint = 'https://smsvote.aeres.games:9999/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // WEB SERVICES
  public login(jsonObject): Observable<any> {
    return this.http.post(this.endpoint + 'login', jsonObject).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('login')));
  }

  public register(jsonObject): Observable<any> {
    return this.http.post(this.endpoint + 'register', jsonObject).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('register')));
  }


  //ERROR HANDLER
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(operation === "login" && error.status === 401){
        //BAD LOGIN OR PASSWORD
        return of(error as T);
      }
      else if(operation === "register" && error.status === 409){
        //BAD EMAIL ALREADY TAKEN
        return of(error as T);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
