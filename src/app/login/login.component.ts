import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {

  showLoading? : boolean;
  private subs = new SubSink();

  constructor(private router : Router , private userService : UserService ){}


  ngOnInit(): void {
    if(this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }


  onLogin(user : User) : void{
    this.showLoading = true;
     this.subs.add(this.userService.login(user).subscribe( 
        {
          next : (response) => {        
            this.userService.addTokenToCache(response.headers.get('Jwt-Token'));
            this.userService.addUserToCache(response.body);
            this.router.navigateByUrl('/user/home');
            this.showLoading = false;
          } ,
          error : (err : HttpErrorResponse) => {
            alert(err.message);
            this.showLoading = false;
          }
        }
      ))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
