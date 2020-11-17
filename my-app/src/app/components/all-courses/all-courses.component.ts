import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  @Input() course:Course[];

  constructor(private courseService:CoursesService) { }

  ngOnInit(){
  }

  showCourses(){
    this.courseService.getCourses().subscribe(c => {
      this.course = c;
    });
  }


}
