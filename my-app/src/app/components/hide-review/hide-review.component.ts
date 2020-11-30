import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Review } from '../../Models/Course';


@Component({
  selector: 'app-hide-review',
  templateUrl: './hide-review.component.html',
  styleUrls: ['./hide-review.component.css']
})
export class HideReviewComponent implements OnInit {
  @Input() review: Review[];

  constructor(private courseServices: CoursesService) { }

  ngOnInit(): void {
  }

  showReviews(){
    this.courseServices.getReviews().subscribe(
      l => this.review = l
    )
  }

  hideReview(){
    let id = document.getElementById('review');
    console.log(id)
  }

}
