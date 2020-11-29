import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { Observable, throwError } from 'rxjs';
import { User } from '../Models/Course';
import { UrlSerializer } from '@angular/router';
import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = `http://${window.location.hostname}:3000/api/`

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

//creating a schedule
login(email, password): Observable<User>{
  let link = `${this.url}/open/login/`
  let body = {"user":{
    'email': email,
    'password': password}
  }
  return this.http.post<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

register(email, password): Observable<User>{
  let link = `${this.url}/open/register/`
  let body = {"user":{
    'email': email,
    'password': password},
    'email': email
  }
  return this.http.post<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  console.log(error.error.message)
  return throwError(error.message);
}
}