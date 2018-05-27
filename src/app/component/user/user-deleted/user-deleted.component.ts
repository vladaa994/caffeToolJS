import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { UserComponent } from '../user-list/user-list.component';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-user-deleted',
  templateUrl: './user-deleted.component.html',
  styleUrls: ['./user-deleted.component.css']
})
export class UserDeletedComponent implements OnInit {

  removedUsers: User[];
  errorMsg: string;
  successMsg: string;
  

  constructor(private userService : UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  	this.userService.getRemovedUsers();
  }

  enableUser(id) {
  	 this.userService.enableUser(id)
       .subscribe(
           (data) => {
             // this.successMsg = data["message"];
             this.toastr.success("User has been successfully enabled.", "User enable");
             this.userService.getActiveUsers();
             this.userService.getRemovedUsers();
           },
           (error) => {
             this.errorMsg = error["message"];
           }
        )
  }

}
