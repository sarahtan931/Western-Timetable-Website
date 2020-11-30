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
    if (!f.value.email){
      this.errorMessage = "Please enter a valid email";
    }
    else if (!f.value.password){
      this.errorMessage = "Please enter a valid password"
    }else{
    this.authService.login(f.value.email, f.value.password).subscribe({
      next: data => {
        this.authService.setLocalStorage(data)
        console.log(data.email)
        console.log("Success");
        //this.router.navigateByUrl('/homeauth')
        if (data.role== 'BASIC'){
          console.log('basic user')
          this.router.navigateByUrl('/homeauth')
        }
        if (data.role == 'ADMIN'){
          console.log('Authenticated User')
          this.router.navigateByUrl('/homeadmin')
        }
      },
      error: error => {
      //  console.log(error.Message)
        console.log('status', error)
        if (error == 422){
        this.errorMessage = "Your account is deactivated. Please contact the administrator"
        }else{
        this.errorMessage = "Please enter a valid email address"
        }
      }
    })
  }
  }

}
