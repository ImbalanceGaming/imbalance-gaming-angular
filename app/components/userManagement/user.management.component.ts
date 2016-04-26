import {Component}      from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, CanActivate, RouterOutlet} from 'angular2/router';

import {authCheck}              from "../../common/auth-check"
import {ComponentInstruction}   from "../../../node_modules/angular2/src/router/instruction";

import {UsersComponent}     from "./users/users.component";
import {UserDetail}         from "./users/userDetail/user-detail.component";
import {GroupsComponent}    from "./groups/groups.component";
import {GroupDetailComponent} from "./groups/groupDetail/group-detail.component";
import {PermissionsComponent} from "./permissions/permissions.component";
import {PermissionDetailComponent} from "./permissions/permissionDetail/permission-detail.component";
import {AuthService} from "../../services/auth.service";
import {Module} from "../../models/module";
import {ModuleService} from "../../services/module.service";

@Component({
    selector: 'user-management',
    templateUrl: 'app/components/userManagement/user.management.component.html',
    styleUrls: ['app/components/userManagement/user.management.component.css'],
    directives: [RouterOutlet, ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/users', name: 'Users', component: UsersComponent, useAsDefault: true},
    {path: '/users/userDetail/:id', name: 'UserDetail', component: UserDetail},
    {path: '/groups', name: 'Groups', component: GroupsComponent},
    {path: '/groups/groupDetail/:id', name: 'GroupDetail', component: GroupDetailComponent},
    {path: '/permissions', name: 'Permissions', component: PermissionsComponent},
    {path: '/permissions/permissionDetail/:id', name: 'PermissionDetail', component: PermissionDetailComponent}
])

@CanActivate((next:ComponentInstruction, previous:ComponentInstruction) => {
    return authCheck(next, previous);
})

export class UserManagementComponent {

    public title = 'User Management';

    private _moduleSectionName: 'User Management';

    private _module: Module = new Module();

    constructor(private _authService:AuthService, private _moduleService: ModuleService) {}

    ngOnInit() {
        this._moduleService.module$.subscribe(module => this._module = module);
        this._moduleService.firstCall();
        this._authService.loggedInCheck();
    }

}
