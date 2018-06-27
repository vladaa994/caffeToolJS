import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router : Router, private userService : UserService) {
    
  }

  username :string;
  year = new Date().getFullYear();
  usernameObserver = this.userService.userLoggedIn.subscribe(
  		(data) => {
  			this.username = data;
  		}
  	)

}
