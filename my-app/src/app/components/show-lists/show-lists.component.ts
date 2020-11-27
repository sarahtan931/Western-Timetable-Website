import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { List } from '../../Models/Course';

@Component({
  selector: 'app-show-lists',
  templateUrl: './show-lists.component.html',
  styleUrls: ['./show-lists.component.css']
})
export class ShowListsComponent implements OnInit {
  @Input() list: List[];

  constructor(private courseServices: CoursesService) { }

  ngOnInit(): void {
  }

  showLists(){
    this.courseServices.getLists().subscribe(
      l => this.list = l
    )
  }

  showIDs(){
    console.log('functiona')
    console.log(this.list)
    console.log(this.list[0].owner)

  }
 

  }


