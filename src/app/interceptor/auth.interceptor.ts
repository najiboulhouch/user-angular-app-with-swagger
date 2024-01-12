import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService : UserService , private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(`${this.userService.apiURL}/user/login`)){
      return next.handle(request);
    }

    const requestClone = request.clone({
      setHeaders : {
        Authorization : `Bearer ${this.userService.getTokenFromCache()}` 
      }
    });

    return next.handle(requestClone);
  }
}
