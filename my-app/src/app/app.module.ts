import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeauthComponent } from './homeauth/homeauth.component';
import { SearchKeywordComponent } from './components/search-keyword/search-keyword.component';
import { ShowListsComponent } from './components/show-lists/show-lists.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';
import { RegisterComponent } from './register/register.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { HideReviewComponent } from './components/hide-review/hide-review.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ShowUserListComponent } from './components/show-user-list/show-user-list.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { PoliciesComponent } from './policies/policies.component';
import { CreatePoliciesComponent } from './components/create-policies/create-policies.component';
import { CreateAupComponent } from './components/create-aup/create-aup.component';
import { CreateDmcaComponent } from './components/create-dmca/create-dmca.component';
import { DisputeComponent } from './components/dispute/dispute.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeauthComponent,
    SearchKeywordComponent,
    ShowListsComponent,
    SearchCourseComponent,
    RegisterComponent,
    HomeadminComponent,
    HideReviewComponent,
    ActivateUserComponent,
    CreateListComponent,
    ShowUserListComponent,
    CreateReviewComponent,
    PoliciesComponent,
    CreatePoliciesComponent,
    CreateAupComponent,
    CreateDmcaComponent,
    DisputeComponent,
    ChangePasswordComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: Window, useValue: window},
    AuthService,
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
