import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { Observable, throwError } from 'rxjs';
import { User, Policy } from '../Models/Course';
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
  let link = `${this.url}open/login/`
  let body = {"user":{
    'email': email,
    'password': password}
  }
  return this.http.post<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

showUsers(): Observable <User[]>{
  let link = `${this.url}admin/showusers`
  return this.http.get<User[]>(link);
}

setActive(email): Observable <User>{
  let body = {
    'email': email
  }
  let link = `${this.url}admin/setactive`
  return this.http.put<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  )
}

setDeActive(email): Observable <User>{
  let body = {
    'email': email
  }
  let link = `${this.url}admin/setdeactive`
  return this.http.put<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  )
}

setAdmin(email): Observable<User>{
  let body = {
    'email': email
  }
  let link = `${this.url}admin/setadmin`
  return this.http.put<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  )
}

setLocalStorage(responseObj){
  localStorage.setItem('token', responseObj.token);
  localStorage.setItem('email', responseObj.email);
  localStorage.setItem('role', responseObj.role);
  localStorage.setItem('name', responseObj.name);
}

logout(){
  localStorage.removeItem('token')
}

register(username, email, password): Observable<User>{
  let link = `${this.url}open/register/`
  let body = {"user":{
    'email': email,
    'password': password,
    'name': username
  },
    'email': email,
    'name': username
  }
  return this.http.post<User>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

makepolicy(policyname, policy): Observable<Policy>{
  let link = `${this.url}admin/makepolicy/`
  let body = {
    "policyname": policyname,
    "policyinput": policy
  }
  return this.http.put<Policy>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  )
}

getpolicy(): Observable<Policy[]>{
  let link = `${this.url}open/policies/`
  return this.http.get<Policy[]>(link).pipe(
    catchError(this.handleError)
  )
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  
  return throwError(error.status);
}
}