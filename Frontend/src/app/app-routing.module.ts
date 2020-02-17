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
import { ObjectiveComponent } from './processes/objective/objective.component';

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
        {path: 'department', component: DepartmentComponent},
        {path: 'objective', component: ObjectiveComponent}
    ]},
    {path: "**", redirectTo:"/", pathMatch: "full"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}