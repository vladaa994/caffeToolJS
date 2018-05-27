import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Role } from '../../../model/role';
import { RoleService } from '../../../service/role.service';
import { Observable } from 'rxjs/Observable';
import { UserComponent } from '../user-list/user-list.component';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit{

  successMsg: string;
  errorMsg: string;
  roles: Role[] = [];
  userObj : User;
  @ViewChild("f") form : NgForm;

  ngOnInit() {
    this.resetForm();
  	this.roleService.getRoles()
  	.subscribe(
  		(data) => {
  			for(let i=0; i < data.length; i++) {
  				this.roles.push(new Role(data[i].id, this.formatRoleName(data[i].name)))
  			}
  		}
  	);
  }

  private formatRoleName(name: string) {
  	let splitedName = name.split("_", 2);
  	return splitedName[1].toLowerCase();
  }

  constructor(private router: Router, private userService: UserService, private roleService: RoleService, private toastr : ToastrService) { }


  create(user: NgForm) {
    console.log(user.value);
    this.userObj = user.value;
  	if(user.value.id == null) {
        this.userService.create(user.value)
          .subscribe(
            (data) => {
              this.toastr.success("User has been created successfully.", "User create");
              user.reset();
              this.userService.getActiveUsers();
            },
            (error) => console.log(error)
        )
    }
    else {
      this.userObj.id = +this.userObj.id;
      console.log(typeof(this.userObj.id));
      this.userService.update(this.userObj)
        .subscribe(
           (data) => {
             this.toastr.success("User has been updated successfully.", "User update");
             this.resetForm();
             this.userService.getActiveUsers();
           }
         )
    }
    
  }

  checkUsername(username : string) {
    this.userService.checkUsername(username)
      .subscribe(
          (data) => {},
          (error) => {
            this.form.form.controls.username.setErrors({'incorrect': true});
            this.errorMsg = error["error"]["message"];
            setTimeout(() => {
              this.errorMsg = null;
            }, 5500)
          }
       )
  }

  resetForm(form? : NgForm) {
    this.userService.resetForm(form);
  }

  close() {
  	this.router.navigate(['/users']);
  }

}
