import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Dispute} from 'src/app/Models/Course';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.css']
})
export class DisputeComponent implements OnInit {
  @Input() disputes: Dispute[];
  isDispute: Boolean;
  isLog : Boolean;
  msg: String;
  dispute: Dispute;


  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  showDispute(){
    this.isLog = false;
    this.isDispute = !this.isDispute;
    this.authservice.showDispute().subscribe({
      next: data => {
        this.disputes = data;
        console.log(data)
      },
      error: error=> {
        console.log('error', error);
      }
    })

  }

  logDispute(){
    this.isDispute = false;
    this.isLog = !this.isLog;

  }

  onLog(f: NgForm){
    this.authservice.makeDispute(f.value.type, f.value.details).subscribe({
      next: data => {
        this.dispute = data;
        console.log(data)
        this.msg = " Created Policy Succesfully";
      },
      error: error=> {
        this.msg = error;
        console.log('error', error);
        this.msg = " Please enter a valid input";
      }
    })
}
}
