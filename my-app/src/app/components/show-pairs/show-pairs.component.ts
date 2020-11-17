import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Schedule } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-show-pairs',
  templateUrl: './show-pairs.component.html',
  styleUrls: ['./show-pairs.component.css']
})
export class ShowPairsComponent implements OnInit {
  @Input() sched: Schedule;
  name: String;
  errorMessage: String;
  msg: String;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.errorMessage = '';

    this.courseService.getPairs(f.value.name).subscribe({
      next: data =>{
        this.sched = data
        console.log(data)
      },
      error: error => {
        this.errorMessage = error
        this.msg = " No schedule pairs to show"
      }
    })    
}
}

