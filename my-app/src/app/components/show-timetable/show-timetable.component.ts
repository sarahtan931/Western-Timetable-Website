import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-show-timetable',
  templateUrl: './show-timetable.component.html',
  styleUrls: ['./show-timetable.component.css']
})
export class ShowTimetableComponent implements OnInit {
@Input()
timetable:Schedule[];
name: string;
errorMessage: string;
msg: string;


  constructor(private courseService: CoursesService) { }

  ngOnInit(){
  }
  onSubmit(f: NgForm) {
    this.errorMessage = "";
    this.timetable = [];
    this.msg = "";

    this.courseService.showTimetable(f.value.name).subscribe({
      next: data => {
        this.timetable = data
        console.log(data)
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = "Please enter a valid course.";
        console.log('error', error)
      }
    })
  }

}
