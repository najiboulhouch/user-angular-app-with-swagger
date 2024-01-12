import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router : Router , private userService : UserService ){}

  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
    if(this.userService.isUserLoggedIn()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
