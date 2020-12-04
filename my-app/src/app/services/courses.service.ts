import { Injectable, ErrorHandler} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Course, CTimetable, CItem, Schedule, List, Review} from '../Models/Course';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   newurl:string = `http://${window.location.hostname}:3000/api/`
 //newurl: string = `/api/`

  constructor(private http:HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getKeyword(keyword: string): Observable <CItem[]>{
  let link = `${this.newurl}/open/searchkeyword/${keyword}`
  return this.http.get<CItem[]>(link).pipe(
    catchError(this.handleError)
  )
}

getreview(subject, coursenum): Observable <Review[]>{
  let link = `${this.newurl}/open/reviews/${subject}/${coursenum}`
  return this.http.get<Review[]>(link).pipe(
    catchError(this.handleError)
  )
}

toggleReview(id: String): Observable <Review>{
  let body = {
    "review" : id
  }
  let link = `${this.newurl}admin/togglereview` 
  return this.http.put<Review>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  )

}

getLists(): Observable <List[]>{
  let link = `${this.newurl}open/showschedule`
  console.log(link)
  return this.http.get<List[]>(link);
}

getCourseCode(subject: string, courseNum: string): Observable <CItem[]>{
  let link = `${this.newurl}open/findbyboth/${subject}/${courseNum}`
  return this.http.get<CItem[]>(link).pipe(
    catchError(this.handleError)
  )
}

getCourseSubject(subject: string): Observable<CItem[]>{
  let link = `${this.newurl}open/findbysubject/${subject}/`
  return this.http.get<CItem[]>(link).pipe(
    catchError(this.handleError)
  )
}

getCourseNum(courseNum: string): Observable<CItem[]>{
  let link = `${this.newurl}open/findbynum/${courseNum}/`
  return this.http.get<CItem[]>(link).pipe(
    catchError(this.handleError)
  )
}

getReviews(): Observable<Review[]>{
  let link = `${this.newurl}admin/showreview/`
  return this.http.get<Review[]>(link)
}


showTimetable(name: string): Observable<Schedule[]>{
  let link = `${this.newurl}open/schedule/find/${name}`
  return this.http.get<Schedule[]>(link).pipe(
    catchError(this.handleError)
  );
}

showTimetableAuth(name: string, email): Observable<Schedule[]>{
  console.log(name)
  let link = `${this.newurl}auth/schedule/find/${name}/${email}`
  return this.http.get<Schedule[]>(link).pipe(
    catchError(this.handleError)
  );
}

createReview(name, subject, catalog_nbr, review, rating): Observable<Review>{
  let body = {          
    "name": name,
    "subject": subject,
    "catalog_nbr": catalog_nbr,
    "hidden": false,
    "review": review,
    "rating": rating
}
  let link = `${this.newurl}auth/makereview`
  return this.http.post<Review>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}





//deleting a schedule
delList(email, name): Observable<List>{
  let link = `${this.newurl}auth/dellist/${email}/${name}`
  return this.http.delete<List>(link, this.httpOptions)
  .pipe(catchError(this.handleError))
}


//getting timetable entries
getUserList(email): Observable<List[]>{
  let link = `${this.newurl}auth/showschedule/${email}`;
  
  return this.http.get<List[]>(link, this.httpOptions)
  .pipe(catchError(this.handleError))
}

//making timetable entries
createList(name, owner, description, owneremail, courseId, courseNum, hidden): Observable<List>{
  let link = `${this.newurl}auth/makeschedule/`
  let body = {
      "owner": owner,
      "name": name,
      "description": description,
      "email": owneremail,
      "courseId": courseId,
      "courseNum": courseNum,
      "hidden": hidden
  }
  
  return this.http.post<List>(link, body, this.httpOptions)
  .pipe(catchError(this.handleError))
}

updateList(name, email, description, courseId, courseNum, hidden): Observable<List>{
  let link = `${this.newurl}auth/updateschedule/`
  let body = {
    "name": name,
    "description": description,
    "email": email,
    "courseId": courseId,
    "courseNum": courseNum,
    "hidden": hidden
  }
  return this.http.put<List>(link, body, this.httpOptions).pipe(
    catchError(this.handleError)
  )
}

//handling errors
//throwing error to front end
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Error.');
}

}
