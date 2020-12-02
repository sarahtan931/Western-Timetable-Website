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
