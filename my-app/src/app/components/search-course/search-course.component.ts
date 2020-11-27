import { Component, OnInit, Input } from '@angular/core';
import { CItem, Course } from '../../Models/Course';
import {NgForm} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  @Input() course:CItem[];
  subject: string;
  courseNum: string;
  errorMessage: string;
  msg: string;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.errorMessage = "";
    this.course = [];
    this.msg = "";
    
    if (f.value.subject!= "" && f.value.courseNum!=""){
    this.courseService.getCourseCode(f.value.subject, f.value.courseNum).subscribe({
      next: data => {
        this.course = data
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

}
