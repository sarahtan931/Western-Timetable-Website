import { Component, OnInit, Input } from '@angular/core';
import { CItem, Review } from '../../Models/Course';
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
  isShow: Boolean;
  review: Review[];
  showReview: Boolean;
  togglereview: Boolean;

  constructor(private courseService:CoursesService) { }

  ngOnInit(){
    this.isShow = false;
    this.togglereview = false;
  }

  showmore(){
    this.isShow = !this.isShow;
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
        this.msg = "Please enter a valid keyword.";
        console.log('error', error)
      }
    })
  }

  reviews(subject, catalog_nbr){
    this.togglereview = !this.togglereview;
    this.showReview = false;
    this.courseService.getreview(subject, catalog_nbr).subscribe({
      next: data => {
        this.review = data;
        console.log(this.review)
        if (this.review){
          this.showReview = true;
        }
      },
      error: error=> {
        this.errorMessage = error;
        this.msg = "Please enter a valid course.";
        console.log('error', error)
      }
    })
  }

}
