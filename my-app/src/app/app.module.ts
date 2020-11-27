import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { CourseCodesComponent } from './components/course-codes/course-codes.component';
import { CourseTimetableComponent } from './components/course-timetable/course-timetable.component';
import { ShowSchedComponent } from './components/show-sched/show-sched.component';
import { CreateSchedComponent } from './components/create-sched/create-sched.component';
import { DeleteSchedComponent } from './components/delete-sched/delete-sched.component';
import { CreatePairsComponent } from './components/create-pairs/create-pairs.component';
import { ShowPairsComponent } from './components/show-pairs/show-pairs.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AllCoursesComponent,
    CourseCodesComponent,
    CourseTimetableComponent,
    ShowSchedComponent,
    CreateSchedComponent,
    DeleteSchedComponent,
    CreatePairsComponent,
    ShowPairsComponent,
    LoginComponent,
    HomeComponent
  
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
