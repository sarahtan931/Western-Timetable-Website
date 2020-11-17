import { Component, OnInit, Input} from '@angular/core';
import { Schedule } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-show-sched',
  templateUrl: './show-sched.component.html',
  styleUrls: ['./show-sched.component.css']
})
export class ShowSchedComponent implements OnInit {
  @Input() schedule:Schedule[];
  errorMessage: string;
  msg : string;

  constructor(private courseService:CoursesService) { }

  ngOnInit(): void {
  }

  showSched(){
    this.errorMessage= "";
    this.schedule = [];

    this.courseService.getSchedules().subscribe({
      next: data =>{
        this.schedule = data;
      },
      error: error =>{
        this.errorMessage = error;
        this.msg = " No schedules to show ";
      }
    });
  }

}
