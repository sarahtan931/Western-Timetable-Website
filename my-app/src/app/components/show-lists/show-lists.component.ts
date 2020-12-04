import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { List, Schedule } from '../../Models/Course';

@Component({
  selector: 'app-show-lists',
  templateUrl: './show-lists.component.html',
  styleUrls: ['./show-lists.component.css']
})
export class ShowListsComponent implements OnInit {
  @Input() list: List[];
  timetable:Schedule[];
  isShown: boolean = false;
  msg: String;
  isTimetable: boolean = false;
  toggleT: boolean = false;

  constructor(private courseServices: CoursesService) { }

  ngOnInit(): void {
  }

  showLists(){
    this.isShown = false;
    this.courseServices.getLists().subscribe(
      l => this.list = l
    )
   
  }

  toggleShow() {
    this.isShown = ! this.isShown;
    }

  showTimetable(name) {
    this.toggleT = !this.toggleT;
    this.isTimetable = false;
      this.msg = "";
      this.courseServices.showTimetable(name).subscribe({
        next: data => {
          this.timetable = data
          if(this.timetable){
            this.isTimetable = true;
          }
          console.log(data)
        },
        error: error=> {
          this.msg = error;
          this.msg = "Please enter a valid course.";
          console.log('error', error)
        }
      })
    }

  }


