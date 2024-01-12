import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  user? : User;
  showLoading? : boolean;
  buttonText : string = 'Show Token';
  token? : string;
  tokenExpirationDate? : Date;
  successMessage : boolean;
  private subscriptions = new SubSink();

  constructor(private userService : UserService , private router : Router){}

  ngOnInit(): void {
    this.user = this.userService.getUserFromCache();
    this.token = this.userService.getTokenFromCache();
    this.tokenExpirationDate = this.userService.getTokenExpirationDate();
  }

  logOut(){
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }

  onUpdateUser() : void{
    console.log('data');
    this.showLoading = true;
    const currentUsername = this.userService.getUserFromCache().username;
    const formData = this.userService.createUserFormData(currentUsername , this.user);
    console.log(formData);
    this.userService.updateUser(formData).subscribe(
      (user : User) => {
        this.showLoading = false;
        this.userService.addUserToCache(user);
        this.successMessage = true;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        this.showLoading = false;
      }
    )
  }

  setButtonText() : void{
    if(this.buttonText === 'Show Token'){
      this.buttonText = 'Hide Token';
    }
    else {
      this.buttonText = 'Show Token';
    }
    //this.buttonText === 'Show Token' ? 'Hide Token' : 'Show Token'
  }

  copyTokenToClipboard() : void{
      const range = document.createRange();
      range.selectNode(document.getElementById('token-container'));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
  }

  onDeleteUser(username : string) : void{
    this.subscriptions.add(
    this.userService.deleteUser(username).subscribe(
      (response) => {
        this.logOut();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
        this.showLoading = false;
      }
    )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
