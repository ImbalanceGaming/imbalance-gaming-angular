"use strict";
var auth_guard_service_1 = require("../../services/auth-guard.service");
var project_router_component_1 = require("./project-router.component");
var projects_component_1 = require("./allProjects/projects.component");
var project_detail_component_1 = require("./projectDetail/project-detail.component");
var package_detail_component_1 = require("./packageDetail/package-detail.component");
exports.projectRoutes = [
    {
        path: 'projects',
        component: project_router_component_1.ProjectRouterComponent,
        children: [
            {
                path: '',
                redirectTo: 'allProjects',
                pathMatch: 'full'
            },
            { path: 'allProjects', component: projects_component_1.ProjectsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'projectDetail/:id', component: project_detail_component_1.ProjectDetailComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'packageDetail/:id', component: package_detail_component_1.PackageDetailComponent, canActivate: [auth_guard_service_1.AuthGuard] }
        ]
    }
];
//# sourceMappingURL=project-router.routes.js.map