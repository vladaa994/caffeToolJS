import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../service/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  roles : any[];
  userId : number;
  editUser : User = {
  	  id: null,
      username: "",
      password: "",
      games: null,
      roleId: null,
      active: true
  }

  constructor(private userService: UserService, private activeRoute : ActivatedRoute  , private router: Router, private roleService: RoleService,
   private toastr: ToastrService) { }

  ngOnInit() {
  	this.roleService.getRoles()
  	.subscribe(
  		(data) => {
  			this.roles = data;
  		}
  	);

  	this.activeRoute.params.subscribe(
  		(route) => {
  			this.userService.editUser(+route["id"])
  				.subscribe(
  					(data) => {
  						this.editUser = data;
  					}
  				)
  		}
  	)
  }

  update(user: NgForm) {
  	this.editUser = user.value;
  	this.userService.update(this.editUser)
  		.subscribe(
  			(data) => {
  				this.userService.getActiveUsers();
  				this.router.navigate(['/users']);
  				this.toastr.success("User has been successfully updated.", "User update");
  			}
  		)
  }

  resetForm(form? : NgForm) {
    this.userService.resetForm(form);
  }

}
