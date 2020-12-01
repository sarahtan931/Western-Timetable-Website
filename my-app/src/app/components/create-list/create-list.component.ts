import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { List } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  @Input() list: List;
  lists : List[];
  email:String;
  name: String;
  description: String;
  hidden: Boolean;
  msg: String;
  isChecked: Boolean;


  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log("boolean", f.value.isChecked)
    this.email = localStorage.getItem('email')
    this.name = localStorage.getItem('name')
    
    var id1 = (<HTMLInputElement>document.getElementById('id1')).value;
    var code1 = (<HTMLInputElement>document.getElementById('code1')).value;

    var id2 = (<HTMLInputElement>document.getElementById('id2')).value;
    var code2 = (<HTMLInputElement>document.getElementById('code2')).value;

    var id3 = (<HTMLInputElement>document.getElementById('id3')).value;
    var code3 = (<HTMLInputElement>document.getElementById('code3')).value;

    var id4 = (<HTMLInputElement>document.getElementById('id4')).value;
    var code4 = (<HTMLInputElement>document.getElementById('code4')).value;

    var id5 = (<HTMLInputElement>document.getElementById('id5')).value;
    var code5 = (<HTMLInputElement>document.getElementById('code5')).value;

    var id = id1 + " " + id2 + " " + id3 + " " + id4 + " " + id5;
    var id = id.trim()
    var code = code1 + " " + code2 + " " + code3 + " " + code4 + " " + code5;
    var code = code.trim()

    this.courseService.createList(f.value.name, this.name, f.value.description, this.email, code, id, !f.value.isChecked).subscribe({
      next: data => {
        this.msg = " Created Succesfully"
      },
      error: error=> {
        this.msg = error;
        console.log('error', error);
        this.msg = " Please enter a valid input";
      }
    })
  }
}
