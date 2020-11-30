import { Injectable, ErrorHandler} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Course, CTimetable, CItem, Schedule, List, Review} from '../Models/Course';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   url:string = `http://${window.location.hostname}:3000/api/courses/`
   newurl:string = `http://${window.location.hostname}:3000/api/`
  

  constructor(private http:HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

//getting all courses
getCourses(): Observable <Course[]>{
  return this.http.get<Course[]>(this.url);
    }

getKeyword(keyword: string): Observable <CItem[]>{
  let link = `${this.newurl}/open/searchkeyword/${keyword}`
  return this.http.get<CItem[]>(link).pipe(
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

//getting all schedules in database
getSchedules(): Observable<Schedule[]>{
  let link = `${this.url}schedule/show`
  return this.http.get<Schedule[]>(link).pipe(
    catchError(this.handleError)
  );
}

//creating a schedule
createSchedule(name): Observable<Schedule>{
  let link = `${this.url}schedule/make/`
  let body = {
    'name': name
  }
  return this.http.post<Schedule>(link, body, this.httpOptions)
  .pipe(catchError(this.handleError)
  );
}

//deleting a schedule
delSchedule(name): Observable<Schedule>{
  let link = `${this.url}schedule/delwithname/${name}`

  return this.http.delete<Schedule>(link, this.httpOptions)
  .pipe(catchError(this.handleError))
}

//deleting all schedules
delAllSched(): Observable<Schedule>{
  let link = `${this.url}schedule/del/`
  return this.http.delete<Schedule>(link, this.httpOptions)
  .pipe(catchError(this.handleError))
}

//getting timetable entries
getPairs(name): Observable<Schedule>{
  let link = `${this.url}schedule/find/${name}`
  return this.http.get<Schedule>(link, this.httpOptions)
  .pipe(catchError(this.handleError))
}

//making timetable entries
makePairs(sched, letters, nums): Observable<Schedule>{
  let link = `${this.url}schedule/updatepairs/`
  let body = {
    'schedule': sched,
    'courseNum': letters,
    'courseId' : nums
  }
  return this.http.put<Schedule>(link, body, this.httpOptions)
  .pipe(catchError(this.handleError))
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
