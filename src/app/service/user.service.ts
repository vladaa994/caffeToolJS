import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Token } from '../model/token';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from '../model/user';
import { ConfigService } from './config.service';


@Injectable()
export class UserService {

  selectedUser : User;
  activeUsers: User[];
  removedUsers: User[];
  errorMsg: string = "";

  constructor(private http : HttpClient, private router : Router, private config : ConfigService) { 
  }

  login(user : NgForm) { 
    return this.http.post<Token>(this.config.baseUrl + "/login" , user, {headers: this.config.contentTypeHeader})
    .map(
    	(response) => {
    		return response;
    	}
    );
  }

  logout() {
  	localStorage.removeItem("token");
  	this.router.navigate(['']);
  }

  isLoggedIn() : boolean {
  	if(this.config.getToken()){
  		return true;
  	}
  	else {
  		return false;
  	}
  }

  getActiveUsers() {
    return this.http.get<User[]>(this.config.baseUrl + "/user/all/active", {headers: this.config.authorizationHeader})
    .map(
      (response) => {
        return response;
      }
      ).subscribe(
        (data) => {
          this.activeUsers = data;
        },
        (error) => {
          if(error["error"]["status"] == 403){
            this.errorMsg = "You are not allowed to see this page!";  
            setTimeout(() => {
                this.router.navigate(['/dashboard']);
            }, 3500);
          }  
        }
      )
  }

  getRemovedUsers() {
     return this.http.get<User[]>(this.config.baseUrl + "/user/all/removed", {headers: this.config.authorizationHeader})
      .map(
          (response) => {
            return response;
          }
       ).subscribe(
         (data) => {
           this.removedUsers = data;
         }
       )
  }

  create(user: NgForm) : Observable<User> {
      return this.http.post<User>(this.config.baseUrl + "/user/save", user, {headers: this.config.authorizationHeader})
      .map(
          (response) => {
            return response;
          }
       )
  }

  editUser(userId : number) : Observable<User> {
    return this.http.get<User>(this.config.baseUrl + "/user/" + userId, {headers: this.config.authorizationHeader})
      .map(
          (result) => {
            return result;
          }
       )
  }

  update(user : User) : Observable<User> {
    return this.http.put<User>(this.config.baseUrl + "/user/update/" + user.id, user, {headers: this.config.authorizationHeader})
      .map(
          (response) => {
            return response
          }
       )
  }

  delete(id: number) : Observable<any> {
     return this.http.get(this.config.baseUrl + "/user/delete/" + id, {headers: this.config.authorizationHeader})
     .map(
        (data) => {
          return data;
        },
        (error) => {
          return error;
        }
      )
  }

  checkUsername(username : string) {
    return this.http.get(this.config.baseUrl + "/user/check-username", {
      params: {
        username: username
      },
      headers: this.config.authorizationHeader
    }).map(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    )
  }

  enableUser(id) {
    return this.http.get(this.config.baseUrl + "user/enable",{
      params: {
        id: id
      },
      headers: this.config.authorizationHeader
    }).map(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    )
  }


resetForm(form? : NgForm) {
    if(form != null) {
      form.reset();
    }
    this.selectedUser = {
      id: null,
      username: "",
      password: "",
      games: null,
      roleId: null,
      active: true
    }
  }


}
