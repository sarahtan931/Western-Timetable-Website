import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Policy } from 'src/app/Models/Course';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-policies',
  templateUrl: './create-policies.component.html',
  styleUrls: ['./create-policies.component.css']
})
export class CreatePoliciesComponent implements OnInit {
@Input()
policies: Policy[];
newpolicy: Policy;
newpolicy2: Policy;
msg1: String;
msg2: String;
msg3: String;
ppolicy: String;
apolicy: String;
dpolicy: String;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.getpolicy().subscribe({
      next: data => {
        this.policies = data;
        console.log(data)
      },
      error: error=> {
        console.log('error', error);
      }
    })
  }

  onPPolicy(f: NgForm){
    this.authservice.makepolicy("Privacy Policy", f.value.ppolicy).subscribe({
      next: data => {
        this.newpolicy = data;
        console.log(data)
        this.msg1 = " Created Policy Succesfully";
      },
      error: error=> {
        this.msg1 = error;
        console.log('error', error);
        this.msg1 = " Please enter a valid input";
      }
    })
  }

  

}
