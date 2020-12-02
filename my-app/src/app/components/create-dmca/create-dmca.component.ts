import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Policy } from 'src/app/Models/Course';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-dmca',
  templateUrl: './create-dmca.component.html',
  styleUrls: ['./create-dmca.component.css']
})
export class CreateDmcaComponent implements OnInit {
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

  
  onDPolicy(f: NgForm){
    this.authservice.makepolicy("DMCA", f.value.dpolicy).subscribe({
      next: data => {
        this.newpolicy = data;
        console.log(data)
        this.msg3 = " Created Policy Succesfully";
      },
      error: error=> {
        this.msg3 = error;
        console.log('error', error);
        this.msg3 = " Please enter a valid input";
      }
    })
  }
}
