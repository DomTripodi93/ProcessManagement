import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './shared/home/home.component';
import { EmployeesComponent } from './scheduling/employees/employees.component';
import { ScheduleComponent } from './scheduling/schedule/schedule.component';
import { DepartmentComponent } from './processes/department/department.component';
import { ObjectiveFullComponent } from './processes/objective/objective-full/objective-full.component';
import { StepFullComponent } from './processes/step/step-full/step-full.component';
import { ScheduleEmployeeComponent } from './scheduling/schedule/schedule-employee/schedule-employee.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full' },
    {path: 'register', component: RegisterComponent },
    {path: 'login', component: SigninComponent},
    {path: "", runGuardsAndResolvers: "always", canActivate: [AuthGuard], children: [
        {path: 'logout', component: SignoutComponent},
        {path: 'employee', component: EmployeesComponent, children: [
            {path:'{employeeId}', component: ScheduleComponent}
        ]},
        {path: 'schedule', component: ScheduleComponent},
        {path: 'schedule/:employeeId', component: ScheduleEmployeeComponent},
        {path: 'department', component: DepartmentComponent},
        {path: 'objective/:department/:objective', component: ObjectiveFullComponent},
        {path: 'step/:department/:objective/:step', component: StepFullComponent}
    ]},
    {path: "**", redirectTo:"/", pathMatch: "full"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}