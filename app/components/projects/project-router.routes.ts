import {RouterConfig} from "@angular/router";

import {AuthGuard} from "../../services/auth-guard.service";
import {ProjectRouterComponent} from "./project-router.component";
import {ProjectsComponent} from "./allProjects/projects.component";
import {ProjectDetailComponent} from "./projectDetail/project-detail.component";
import {PackageDetailComponent} from "./packageDetail/package-detail.component";

export const projectRoutes: RouterConfig = [
    {
        path: 'projects',
        component: ProjectRouterComponent,
        children: [
            {
                path: '',
                redirectTo: 'allProjects',
                pathMatch: 'full'
            },
            {path: 'allProjects', component: ProjectsComponent, canActivate: [AuthGuard]},
            {path: 'projectDetail/:id', component: ProjectDetailComponent, canActivate: [AuthGuard]},
            {path: 'packageDetail/:id', component: PackageDetailComponent, canActivate: [AuthGuard]}
        ]
    }
];