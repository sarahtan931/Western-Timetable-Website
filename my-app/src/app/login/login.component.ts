import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() 
  errorMessage: String;
  email: String;
  password: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.errorMessage = "";

    this.authService.login(f.value.email, f.value.password).subscribe({
      next: data => {
        this.authService.setLocalStorage(data)
        console.log(data)
        console.log("Success");
        //this.router.navigateByUrl('/homeauth')
        if (data.role == 'BASIC'){
          console.log('basic user')
          this.router.navigateByUrl('/homeauth')
        }
        else{
          console.log('Authenticated User')
          this.router.navigateByUrl('/homeadmin')
        }
      },
      error: error => {
        console.log(error.Message)
        this.errorMessage = "Please enter valid login credentials"
        console.log("Error")
      }
    })

  }

}
