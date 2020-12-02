import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Policy } from 'src/app/Models/Course';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-aup',
  templateUrl: './create-aup.component.html',
  styleUrls: ['./create-aup.component.css']
})
export class CreateAupComponent implements OnInit {
  @Input()
  ppolicy: String;
  apolicy: String;
  dpolicy: String;
  pname: String;
  newpolicy: Policy;
  newpolicy2: Policy;
  msg1: String;
  msg2: String;
  msg3: String;
  
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  onAPolicy(f: NgForm){
    console.log("apolicy", f.value.apolicy)
    this.authservice.makepolicy("Acceptable Use Policy", f.value.apolicy).subscribe({
      next: data => {
        this.newpolicy2 = data;
        console.log(data)
        this.msg2 = " Created Policy Succesfully";
      },
      error: error=> {
        this.msg2 = error;
        console.log('error', error);
        this.msg2 = " Please enter a valid input";
      }
    })
  }
}
