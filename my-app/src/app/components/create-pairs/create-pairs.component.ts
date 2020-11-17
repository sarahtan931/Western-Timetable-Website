import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Schedule } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-create-pairs',
  templateUrl: './create-pairs.component.html',
  styleUrls: ['./create-pairs.component.css']
})
export class CreatePairsComponent implements OnInit {
  @Input() sched: Schedule; 
  name: String;
  errorMessage: String;
  msg: String;

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.errorMessage = '';

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
    var code = code1 + " " + code2 + " " + code3 + " " + code4 + " " + code5;
    console.log(id)
    console.log(code)

    this.courseService.makePairs(f.value.name, code, id).subscribe({

      next: data => {
        console.log(data);
        this.sched = data;
        this.msg = " Created Succesfully"
      },
      error: error=> {
        this.errorMessage = error;
        console.log('error', error);
        this.msg = " Please enter a valid input";
      }
    })

  }

}
