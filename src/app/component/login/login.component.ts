import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginError: string;

  constructor(private userService: UserService, private router : Router) {

  }

  onLogin(user : NgForm) {
      this.userService.login(user.value)
      .subscribe(
        (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            this.userService.userLoggedIn.next(data.username);
            this.router.navigate(['/dashboard']);
        },
        (error) => {
            console.log(error);
           this.loginError = error["error"]["message"]
        }
      )
  }

}
