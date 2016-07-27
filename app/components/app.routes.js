"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require("./dashboard/dashboard.component");
var login_component_1 = require("./login/login.component");
var registration_component_1 = require("./registration/registration.component");
var user_management_routes_1 = require("./userManagement/user-management.routes");
var project_router_routes_1 = require("./projects/project-router.routes");
var auth_guard_service_1 = require("../services/auth-guard.service");
var routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: registration_component_1.RegistrationComponent },
    { path: 'activate/:id', component: registration_component_1.RegistrationComponent }
].concat(user_management_routes_1.userManagementRoutes, project_router_routes_1.projectRoutes);
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map