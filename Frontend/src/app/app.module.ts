import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { DepartmentComponent } from './department/department.component';
import { ObjectiveComponent } from './department/objective/objective.component';
import { StepComponent } from './department/objective/step/step.component';
import { BestPracticeComponent } from './department/objective/step/best-practice/best-practice.component';
import { CommonDifficultyComponent } from './department/objective/step/common-difficulty/common-difficulty.component';
import { EmployeesComponent } from './employees/employees.component';
import { ScheduleComponent } from './employees/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    SignoutComponent,
    DepartmentComponent,
    ObjectiveComponent,
    StepComponent,
    BestPracticeComponent,
    CommonDifficultyComponent,
    EmployeesComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
