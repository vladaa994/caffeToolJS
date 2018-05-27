import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class CheckLoggedInGuard implements CanActivate {
  
  constructor(private router: Router, private userService : UserService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
  	if(this.userService.isLoggedIn()){
  		this.router.navigate(['/dashboard']);
  		return false;
  	}
  	else {
  		return true;
  	}
  }
}
