import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private router : Router, private userService : UserService) { 
  }

  ngOnInit() {
    this.userService.isTokenExpired();
    this.userService.getCurrentUser()
      .subscribe(
          (user) => {
              sessionStorage.setItem("userId", user.id.toString());
          },
          (error) => {
            console.log(error);
          }
       )
  }

  redirectToUsers() {
  	this.router.navigate(['/users']);
  }

  redirectToPlayers() {
  	this.router.navigate(['/players']);
  }

  redirectToBiliard() {
  	this.router.navigate(['/biliard']);
  }

  logout() {
  	this.userService.logout();
  }

}
