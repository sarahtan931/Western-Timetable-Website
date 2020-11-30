import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Review } from '../../Models/Course';


@Component({
  selector: 'app-hide-review',
  templateUrl: './hide-review.component.html',
  styleUrls: ['./hide-review.component.css']
})
export class HideReviewComponent implements OnInit {
  @Input() review: Review[];
  id: String;
  newReview: Review;
  msg: String;
  hidden: Boolean;
 
  constructor(private courseServices: CoursesService) { }

  ngOnInit(): void {
  }

  showReviews(){
    this.msg = "";
    this.courseServices.getReviews().subscribe({
    //  l => this.review = l
    next: data => {
      this.review = data;
      //console.log(this.review)
    },
    error: error=> {
      this.msg = error;
      this.msg = "Please enter a valid course.";
      console.log('error', error)
    }}
    )
   
  }

  toggle(id, hidden){
    this.msg = "";
   // console.log(id)
    this.courseServices.toggleReview(id).subscribe(
      l => this.newReview = l
    )
    this.showReviews();
   
    this.msg = "Succesfully toggled review."
  }
}
