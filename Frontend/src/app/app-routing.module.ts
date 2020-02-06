import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './shared/home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full' },
    {path: 'register', component: RegisterComponent },
    {path: 'login', component: SigninComponent},
    {path: "", runGuardsAndResolvers: "always", canActivate: [AuthGuard], children: [
        {path: 'logout', component: SignoutComponent}
    ]},
    {path: "**", redirectTo:"/", pathMatch: "full"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}