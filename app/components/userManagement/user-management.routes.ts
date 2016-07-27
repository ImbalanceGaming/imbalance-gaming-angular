import {RouterConfig} from "@angular/router";

import {UserManagementComponent} from "./user-management.component";
import {UsersComponent} from "./users/users.component";
import {UserDetail} from "./users/userDetail/user-detail.component";
import {GroupsComponent} from "./groups/groups.component";
import {GroupDetailComponent} from "./groups/groupDetail/group-detail.component";
import {PermissionsComponent} from "./permissions/permissions.component";
import {PermissionDetailComponent} from "./permissions/permissionDetail/permission-detail.component";
import {AuthGuard} from "../../services/auth-guard.service";

export const userManagementRoutes: RouterConfig = [
    {
        path: 'user-management',
        component: UserManagementComponent,
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
            {path: 'users/userDetail/:id', component: UserDetail, canActivate: [AuthGuard]},
            {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
            {path: 'groups/groupDetail/:id', component: GroupDetailComponent, canActivate: [AuthGuard]},
            {path: 'permissions', component: PermissionsComponent, canActivate: [AuthGuard]},
            {path: 'permissions/permissionDetail/:id', component: PermissionDetailComponent, canActivate: [AuthGuard]}
        ]
    }
];