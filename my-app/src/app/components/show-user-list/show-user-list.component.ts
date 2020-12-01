import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course, List, Schedule } from '../../Models/Course';
import {NgForm} from '@angular/forms';


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
  isTimetable: boolean = false;
  isUpdate: boolean = false;
  owner: String;
  name: String;
  listname: String;

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
          //console.log(data)
          this.msg = "Succesfully deleted list"
          setTimeout(()=>{                     
            this.showLists();
          }, 500);
  
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

  hidetimetable(){
    this.isTimetable = false;
  }

  hideupdate(){
    this.isUpdate= false;
  }
  
  toggleUpdate(name, owner){
    this.isUpdate = true;
    this.listname = name;
    this.owner = owner;
  }

  showtimetable(name){
    this.isTimetable = true;
    //console.log(name)
    this.email = localStorage.getItem('email')
    this.courseServices.showTimetableAuth(name, this.email).subscribe({
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

  submit(f: NgForm) {
    console.log("boolean", f.value.isChecked)
    this.name = localStorage.getItem('name')

    var id11 = (<HTMLInputElement>document.getElementById('id11')).value;
    var code11 = (<HTMLInputElement>document.getElementById('code11')).value;

    var id12 = (<HTMLInputElement>document.getElementById('id12')).value;
    var code12 = (<HTMLInputElement>document.getElementById('code12')).value;

    var id13 = (<HTMLInputElement>document.getElementById('id13')).value;
    var code13 = (<HTMLInputElement>document.getElementById('code13')).value;

    var id14 = (<HTMLInputElement>document.getElementById('id14')).value;
    var code14 = (<HTMLInputElement>document.getElementById('code14')).value;

    var id15 = (<HTMLInputElement>document.getElementById('id15')).value;
    var code15 = (<HTMLInputElement>document.getElementById('code15')).value;

    var code = id11 + " " + id12 + " " + id13 + " " + id14 + " " + id15;
    var id = code11 + " " + code12 + " " + code13 + " " + code14 + " " + code15;
  
    var code = code.trim()
    var id = id.trim()
    console.log(code)
    console.log(id)

    this.courseServices.updateList(this.listname, this.email, f.value.description, id, code, !f.value.isChecked).subscribe({
      next: data => {
        this.msg = " Created Succesfully"
        setTimeout(()=>{                     
          this.showLists();
        }, 500);
        
        this.isUpdate= false;
      },
      error: error=> {
        this.msg = error;
        console.log('error', error);
        this.msg = " Please enter a valid input";
      }
    })
  }

}
