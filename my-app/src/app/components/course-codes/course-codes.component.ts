import { Component, OnInit, Input } from '@angular/core';
import { CItem } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-course-codes',
  templateUrl: './course-codes.component.html',
  styleUrls: ['./course-codes.component.css']
})
export class CourseCodesComponent implements OnInit {
  @Input() course:CItem[];
  subcode: string;
  errorMessage: string;
  msg: string;

  constructor(private courseService:CoursesService) { }

  ngOnInit(){
  }
  onSubmit(f: NgForm) {
    this.errorMessage = "";
    this.course = [];
    this.msg = "";

    this.courseService.getCourseCodes(f.value.subcode).subscribe({
      next: data => {
        this.course = data
        console.log(data)
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = "Please enter a valid course.";
        console.log('error', error)
      }
    })
  }

  getColor(color: string): string{
    if (color == 'LEC'){
      return "#e6ffff"
    }
    if (color == 'TUT'){
      return "#ffe6ff"
    }
    else{
      return "#ffeee6"
    }
  }
}
