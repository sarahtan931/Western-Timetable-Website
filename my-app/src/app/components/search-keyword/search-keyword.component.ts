import { Component, OnInit, Input } from '@angular/core';
import { CItem } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.css']
})
export class SearchKeywordComponent implements OnInit {
  @Input() course:CItem[];
  keyword: string;
  errorMessage: string;
  msg: string;

  constructor(private courseService:CoursesService) { }

  ngOnInit(){
  }
  onSubmit(f: NgForm) {
    this.errorMessage = "";
    this.course = [];
    this.msg = "";

    this.courseService.getKeyword(f.value.keyword).subscribe({
      next: data => {
        this.course = data
        console.log(data)
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = "Please enter a valid course.";
        console.log('error', error)
      }
    })
  }

}
