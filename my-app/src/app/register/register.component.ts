import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() 
  errorMessage: String;
  email: String;
  password: String;
  msg: String;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.errorMessage = "";
    this.msg = "";

    this.authService.register(f.value.email, f.value.password).subscribe({
      next: data => {
        console.log("Made an account");
        this.msg = "Successfully made account"
        this.router.navigateByUrl('/login')
      },
      error: error => {
        this.errorMessage = "Please enter a valid email. Make sure you dont already have an account with that email"
        console.log("Error")
      }
    })

  }
}
