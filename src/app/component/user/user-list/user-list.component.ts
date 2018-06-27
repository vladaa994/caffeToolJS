import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserComponent implements OnInit {


  constructor(private userService : UserService, private router : Router, private toastr:  ToastrService) { 
  }

  ngOnInit(){
    if(this.userService.isTokenExpired()) {
      this.userService.logout();
    }
    this.userService.getActiveUsers();
  }

  //disable some user
  delete(id: number){
    this.userService.delete(id)
      .subscribe(
          (data) => {
            this.toastr.error("User has been deleted", "Delete user")
            this.userService.getActiveUsers();
            this.userService.getRemovedUsers();
          },
          (error) => console.log(error)
       )
  }

}
