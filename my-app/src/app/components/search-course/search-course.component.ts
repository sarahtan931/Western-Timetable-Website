import { Component, OnInit, Input } from '@angular/core';
import { CItem, Course, Review } from '../../Models/Course';
import {NgForm} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  @Input() course:CItem[];
  review: Review[];
  subject: string;
  courseNum: string;
  errorMessage: string;
  msg: string;
  isShown: boolean = false ; // hidden by default
  showReview: boolean = false;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {};
  
  onSubmit(f: NgForm) {
    this.isShown = false;
    this.errorMessage = "";
    this.course = [];
    this.msg = "";
   
    if (!f.value.subject){
      this.courseService.getCourseNum(f.value.courseNum).subscribe({
        next: data => {
          this.course = data;
          console.log(this.course)
        },
        error: error=> {
          this.errorMessage = error;
          this.msg = "Please enter a valid course.";
          console.log('error', error)
        }
      })
    }
    else if (!f.value.courseNum){
      this.courseService.getCourseSubject(f.value.subject).subscribe({
        next: data => {
          this.course = data;
          console.log(this.course)
        },
        error: error=> {
          this.errorMessage = error;
          this.msg = "Please enter a valid course.";
          console.log('error', error)
        }
      })
    }
    else if (f.value.subject!= "" && f.value.courseNum!=""){
    this.courseService.getCourseCode(f.value.subject, f.value.courseNum).subscribe({
      next: data => {
        this.course = data;
        console.log(this.course)
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = "Please enter a valid course.";
        console.log('error', error)
      }
    })
  }
  else{
    console.log('input both')
    this.msg = "Please enter a valid course.";
  }
}


reviews(subject, catalog_nbr){
  this.showReview = false;
  this.isShown =! this.isShown;
  this.courseService.getreview(subject, catalog_nbr).subscribe({
    next: data => {
      this.review = data;
      console.log(this.review)
      if (this.review && this.isShown==true){
        this.showReview = true;
      }
    },
    error: error=> {
      this.errorMessage = error;
      this.msg = "Please enter a valid course.";
      console.log('error', error)
    }
  })
}

}
