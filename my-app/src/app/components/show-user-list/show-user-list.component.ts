import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course, List, Schedule } from '../../Models/Course';


@Component({
  selector: 'app-show-user-list',
  templateUrl: './show-user-list.component.html',
  styleUrls: ['./show-user-list.component.css']
})
export class ShowUserListComponent implements OnInit {
  @Input() list: List[];
  timetable:Schedule[];
  dellist: List;
  isShown: boolean = false ;
  email: String;
  title: String;
  msg: String;

  constructor(private courseServices: CoursesService) { }

  ngOnInit(): void {
    this.title = localStorage.getItem('name');
  }

  showLists(){
    this.isShown = false;
    this.email = localStorage.getItem('email')
    this.courseServices.getUserList(this.email).subscribe(
      l => this.list = l
    )
   
  }

  delList(name){
    this.email = localStorage.getItem('email')
    this.courseServices.delList(this.email, name).subscribe(
      {
        next: data => {
          this.dellist = data
          console.log(data)
          this.msg = "Succesfully deleted list"
        },
        error: error=> {
         
          this.msg = "Please enter a valid course.";
          console.log('error', error)
        }
      }
    )
   
  }

  toggleShow() {
    this.isShown = ! this.isShown;
    }

  showtimetable(name){
    this.courseServices.showTimetableAuth(name).subscribe({
      next: data => {
        this.timetable = data
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
