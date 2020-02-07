import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './shared/home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { ScheduleComponent } from './employees/schedule/schedule.component';
import { DepartmentComponent } from './department/department.component';
import { ObjectiveComponent } from './department/objective/objective.component';

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