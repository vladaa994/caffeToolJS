import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private userService : UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean>|Promise<boolean>|boolean {
    
    if(this.userService.isLoggedIn()){
    	return true;
    }
    else {
    	this.router.navigate(['']);
    	return false;
    }
  }
}
