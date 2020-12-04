import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { User } from 'src/app/Models/Course';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() user: User;
  password: String;
  password1: String;
  email: String;
  msg: String;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if (f.value.password == f.value.password1){
    this.email = localStorage.getItem('email')
    this.authservice.changePassword(this.email, f.value.password).subscribe({
      next: data => {
        this.user = data;
        console.log(data)
        this.msg = " Updated Password Succesfully";
      },
      error: error=> {
        this.msg = error;
        console.log('error', error);
        this.msg = " Please enter a valid input";
      }
    })
  }else{
    this.msg = "Make sure your passwords match"
  }
    
}
}
