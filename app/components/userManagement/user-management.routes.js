"use strict";
var user_management_component_1 = require("./user-management.component");
var users_component_1 = require("./users/users.component");
var user_detail_component_1 = require("./users/userDetail/user-detail.component");
var groups_component_1 = require("./groups/groups.component");
var group_detail_component_1 = require("./groups/groupDetail/group-detail.component");
var permissions_component_1 = require("./permissions/permissions.component");
var permission_detail_component_1 = require("./permissions/permissionDetail/permission-detail.component");
var auth_guard_service_1 = require("../../services/auth-guard.service");
exports.userManagementRoutes = [
    {
        path: 'user-management',
        component: user_management_component_1.UserManagementComponent,
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            { path: 'users', component: users_component_1.UsersComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'users/userDetail/:id', component: user_detail_component_1.UserDetail, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'groups', component: groups_component_1.GroupsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'groups/groupDetail/:id', component: group_detail_component_1.GroupDetailComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'permissions', component: permissions_component_1.PermissionsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'permissions/permissionDetail/:id', component: permission_detail_component_1.PermissionDetailComponent, canActivate: [auth_guard_service_1.AuthGuard] }
        ]
    }
];
//# sourceMappingURL=user-management.routes.js.map