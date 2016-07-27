import { provideRouter, RouterConfig } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {userManagementRoutes} from "./userManagement/user-management.routes";
import {projectRoutes} from "./projects/project-router.routes";
import {AuthGuard} from "../services/auth-guard.service";

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: RegistrationComponent},
    {path: 'activate/:id', component: RegistrationComponent},
    ...userManagementRoutes,
    ...projectRoutes
];

export const appRouterProviders = [
    provideRouter(routes)
];
