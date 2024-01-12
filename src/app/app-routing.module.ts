import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path : 'login' , component : LoginComponent} ,
  { path : 'user/home' , component : HomeComponent  , canActivate : [AuthenticationGuard] },
  {path : '' , redirectTo : '/login' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled',  useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
