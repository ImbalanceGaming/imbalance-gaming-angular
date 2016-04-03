import {Component}      from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, CanActivate, RouterOutlet} from 'angular2/router';

import {authCheck}              from "../../common/auth-check"
import {ComponentInstruction}   from "../../../node_modules/angular2/src/router/instruction";

import {User}               from '../../models/user';
import {UserService}        from '../../services/user.service';
import {UsersComponent}     from "./users/users.component";
import {UserDetail}         from "./users/userDetail/user-detail.component";
import {GroupsComponent}    from "./groups/groups.component";
import {GroupDetailComponent} from "./groups/groupDetail/group-detail.component";

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
    {path: '/groups/groupDetail/:id', name: 'GroupDetail', component: GroupDetailComponent}
])

@CanActivate((next:ComponentInstruction, previous:ComponentInstruction) => {
    return authCheck(next, previous);
})

export class UserManagementComponent {

    public title = 'User Management';
    private _user:User;

    constructor(private _userService:UserService) {}

    ngOnInit() {
        this._userService.user$.subscribe(updatedUser => this._user = updatedUser);
        this._userService.loggedInCheck();
    }

}
