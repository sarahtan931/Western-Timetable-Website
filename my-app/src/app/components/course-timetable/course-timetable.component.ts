import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { CTimetable } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-timetable',
  templateUrl: './course-timetable.component.html',
  styleUrls: ['./course-timetable.component.css']
})
export class CourseTimetableComponent implements OnInit {
  @Input() course:CTimetable[];
  subcode: string;
  subname: string;
  type: string;
  color: string;
  errorMessage: string;
  msg: string;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
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

  onSubmit(f: NgForm){
    this.errorMessage = "";
    this.course = [];
    this.msg = "";
  
   if(!f.value.type){
    this.courseService.getCourseTimetable1(f.value.subcode, f.value.subname).subscribe({
    next: data => {
        this.course = data;
        console.log(data);
    },
    error: error => {
        this.msg = " Please enter a valid course. "
        this.errorMessage = error;
        console.log('error', error);
    }
    });
  }
  else{
    this.courseService.getCourseTimetable2(f.value.subcode, f.value.subname, f.value.type).subscribe(
      {
        next: data => {
          this.course = data;
          console.log(data);
      },
      error: error => {
        this.msg = " Please enter a valid course. "
        this.errorMessage = error;
        console.log('error', error);
    }
    });
  }
  }

 

}
