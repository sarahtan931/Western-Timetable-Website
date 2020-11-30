import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homeauth',
  templateUrl: './homeauth.component.html',
  styleUrls: ['./homeauth.component.css']
})
export class HomeauthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/home')
  }

}
