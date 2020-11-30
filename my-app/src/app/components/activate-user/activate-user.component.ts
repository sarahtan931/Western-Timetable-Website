import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../Models/Course';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {
@Input() userArray: User[];
  user: User;
 msg: String;
 activemsg: String;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.showUsers().subscribe({
      next: data => {
        this.userArray = data;
      },
      error: error=> {
        this.msg = error;
        this.msg = "Please enter a valid course.";
      }
    })

  }

  setActive(email){
    this.authService.setActive(email).subscribe({
      next: data => {
        this.user = data;
        this.showUsers();
      },
      error: error=> {
        this.msg = error;
        this.msg = "User is already active";
      }
    })
  }

  setDeActive(email){
    this.authService.setDeActive(email).subscribe({
      next: data => {
        this.user = data;
        this.showUsers();
      },
      error: error=> {
        this.msg = "User is already deactived";
      }
    })
  }

  setAdmin(email){
    this.authService.setAdmin(email).subscribe({
      next: data => {
        this.user = data;
        this.showUsers();
      },
      error: error=> {
        this.msg = error;
        this.msg = "User is already an Admin";
      }
    })
  }



  showUsers(){
    this.authService.showUsers().subscribe({
      next: data => {
        this.userArray = data;
      },
      error: error=> {
        this.msg = error;
        this.msg = "Please enter a valid course.";
        console.log('error', error)
      }
    })

  }

}
