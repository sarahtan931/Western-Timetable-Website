import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css']
})
export class HomeadminComponent implements OnInit {
  @Input() 
  msg: String;
  errorMessage: String;
  email: String;
  password: String;
  name: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')
    console.log(this.name)
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/home')
  }

  viewpolicies(){
    this.router.navigateByUrl('/policies')
  }
 
}
