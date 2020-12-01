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
  timetables: Array<any>;
  isShown: boolean = false ;
  

  constructor(private courseServices: CoursesService) { }

  ngOnInit(): void {
  }

  showLists(){
    this.isShown = false;
    this.courseServices.getLists().subscribe(
      l => this.list = l
    )
   
  }

  toggleShow() {
    this.isShown = ! this.isShown;
    }

  }


