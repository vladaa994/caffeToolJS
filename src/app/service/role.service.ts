import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Role } from '../model/role';
import { ConfigService } from './config.service';

@Injectable()
export class RoleService {

  private headers = new HttpHeaders({"Content-Type": "application/json", "Authorization": this.config.getToken()});
  private options = {headers: this.headers};

  constructor(private http : HttpClient, private userService : UserService, private config : ConfigService) { }
 
  //get roles from server and implement on user->create

  getRoles() : Observable<Role[]> {
  	return this.http.get<Role[]>(this.config.getBaseUrl() + "/role/all", this.options)
  	.map(
  		(response) => {
  			return response;
  		}
  	);
  }

}
