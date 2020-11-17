import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';
import {NgForm} from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-delete-sched',
  templateUrl: './delete-sched.component.html',
  styleUrls: ['./delete-sched.component.css']
})
export class DeleteSchedComponent implements OnInit {
  @Input() sched:Schedule;
  name: string;
  errorMessage: string;
  msg: string;

  constructor(private courseService:CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.errorMessage = '';
    this.msg = '';

    this.courseService.delSchedule(f.value.name).subscribe({
      next: data => {
        this.sched = data
        this.msg = " deleted";
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = " Make sure the schedule you are trying to delete exists";
        console.log('error', error)
      }
    })
  }

  delAllSchedules(){
    this.errorMessage = '';
    this.msg = '';

    this.courseService.delAllSched().subscribe({
      next: data => {
        this.sched = data;
        this.msg = " deleted";
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = " Make sure there are schedules to delete ";
        console.log('error', error)
      }
    })

  }
}
