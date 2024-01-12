import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiURL = environment.apiURL;
  private jwtHelper = new JwtHelperService();

  constructor(private http : HttpClient) { }

  login(user : User) : Observable<HttpResponse<User>>{
      return this.http.post<User>(`${this.apiURL}/user/login` , user , { observe : 'response'}) 
  }

  updateUser(formData : FormData) : Observable<User>{
    return this.http.post<User>(`${this.apiURL}/user/update` , formData) ;
  }

  deleteUser(username : string) : Observable<string>{
    return this.http.delete<string>(`${this.apiURL}/user/delete/${username}`) ;
  }

  addUserToCache(user : User | null) : void{
    console.log(user);
    localStorage.setItem('user-account' , JSON.stringify(user));
  }

  getUserFromCache() : User{
    const userJson = localStorage.getItem('user-account');
    return userJson !== null ? JSON.parse(userJson) : new User();
  }

  addTokenToCache(token : string | null) : void{
    localStorage.setItem('token-account' , token !== null ? token : '');
  }

  getTokenFromCache() : string {
    const token = localStorage.getItem('token-account');
    return token !== null ? token : '';
  }

  logOut() : void{
    localStorage.removeItem('user-account');
    localStorage.removeItem('token-account');
  }

  getTokenExpirationDate() : Date | null {
   return this.jwtHelper.getTokenExpirationDate(this.getTokenFromCache());
  }

  isUserLoggedIn() : boolean {
    if(this.getTokenFromCache() && this.getUserFromCache()  && !this.jwtHelper.isTokenExpired(this.getTokenFromCache()))
        return true;
    else {
        this.logOut();
        return false ;
    }
  }

  createUserFormData(currentUsername : string , user : User) : FormData{
    const formData = new FormData();
    formData.append('currentUsername' , currentUsername);
    formData.append('firstName' , user.firstName);
    formData.append('lastName' , user.lastName);
    formData.append('username' , user.username);
    formData.append('email' , user.email);
    formData.append('role' , user.role);
    formData.append('isActive' , JSON.stringify(user.active));
    formData.append('isNonLocked' , JSON.stringify(user.notLocked));
    return formData;
  }
}
