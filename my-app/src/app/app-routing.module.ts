import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeauthComponent} from './homeauth/homeauth.component';
import { RegisterComponent } from './register/register.component';
import { HomeadminComponent} from './homeadmin/homeadmin.component';
import { PoliciesComponent } from './policies/policies.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'homeauth', component: HomeauthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'homeadmin', component: HomeadminComponent},
  {path: 'policies', component: PoliciesComponent},
  
  //otherwise re
  {path: '**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
