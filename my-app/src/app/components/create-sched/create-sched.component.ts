import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-sched',
  templateUrl: './create-sched.component.html',
  styleUrls: ['./create-sched.component.css']
})
export class CreateSchedComponent implements OnInit {
@Input() sched:Schedule;
name: string;
errorMessage: string;
msg: string;

  constructor(private courseService:CoursesService) { }

  ngOnInit(): void {
  
  }

  onSubmit(f: NgForm){
    this.errorMessage = "";

    this.courseService.createSchedule(f.value.name).subscribe({
      next: data => {
        this.msg = "Succefully created Schedule : "
        console.log(data)
        this.sched = data
      },
      error: error=> {
        this.msg = "Please enter a valid input and make sure that the schedule does not already exist."
        this.errorMessage = error;
        console.log('error', error)
      }
    })

  }

}
