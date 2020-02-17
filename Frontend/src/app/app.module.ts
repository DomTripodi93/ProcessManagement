import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouteModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { DepartmentComponent } from './processes/department/department.component';
import { ObjectiveComponent } from './processes/objective/objective.component';
import { StepComponent } from './processes/step/step.component';
import { BestPracticeComponent } from './processes/best-practice/best-practice.component';
import { CommonDifficultyComponent } from './processes/common-difficulty/common-difficulty.component';
import { EmployeesComponent } from './scheduling/employees/employees.component';
import { ScheduleComponent } from './scheduling/schedule/schedule.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { DepartmentSingleComponent } from './processes/department/department-single/department-single.component';
import { DepartmentFormComponent } from './processes/department/department-form/department-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    RegisterComponent,
    SigninComponent,
    SignoutComponent,
    DepartmentComponent,
    ObjectiveComponent,
    StepComponent,
    BestPracticeComponent,
    CommonDifficultyComponent,
    EmployeesComponent,
    ScheduleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DepartmentSingleComponent,
    DepartmentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
