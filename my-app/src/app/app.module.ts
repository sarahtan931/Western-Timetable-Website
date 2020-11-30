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
import { ShowTimetableComponent } from './components/show-timetable/show-timetable.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { GrantAdminComponent } from './components/grant-admin/grant-admin.component';
import { HideReviewComponent } from './components/hide-review/hide-review.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor'


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
    ShowTimetableComponent,
    HomeadminComponent,
    GrantAdminComponent,
    HideReviewComponent,
    ActivateUserComponent
  
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
