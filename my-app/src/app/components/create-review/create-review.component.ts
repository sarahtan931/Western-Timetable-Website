import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Review } from '../../Models/Course';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  @Input() newreview: Review;
  name: String;
  msg: String;
  rating: String;
  review: String;
  subject: String;
  catalog_nbr: String;
  newmsg: String;


  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.msg = "";
    this.name = localStorage.getItem('name');
    this.courseService.createReview(this.name, f.value.subject, f.value.catalog_nbr, f.value.review, f.value.rating ).subscribe({
      next: data => {
        this.newreview = data;
        console.log(data.review)
        this.msg = " Created Review Succesfully";
        this.newmsg = data.review.toString() + data.rating.toString();
      },
      error: error=> {
        this.msg = error;
        console.log('error', error);
        this.msg = " Please enter a valid input";
      }
    })
  }

}
