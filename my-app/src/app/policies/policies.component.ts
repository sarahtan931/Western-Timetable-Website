import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Policy } from 'src/app/Models/Course';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  @Input() policies: Policy[];

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.getpolicy().subscribe({
      next: data => {
        this.policies = data;
        console.log("Sarah",data)
      },
      error: error=> {
        console.log('error', error);
      }
    })
  }

  login(){
    this.router.navigateByUrl('/login')
  }

  home(){
    this.router.navigateByUrl('/home')
  }
  register(){
    this.router.navigateByUrl('/register')
  }

}
