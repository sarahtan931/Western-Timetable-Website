import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeauthComponent } from './homeauth/homeauth.component';
import { SearchKeywordComponent } from './components/search-keyword/search-keyword.component';
import { ShowListsComponent } from './components/show-lists/show-lists.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeauthComponent,
    SearchKeywordComponent,
    ShowListsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: Window, useValue: window},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
