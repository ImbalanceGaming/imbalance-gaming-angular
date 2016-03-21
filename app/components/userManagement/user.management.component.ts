import {Component, OnInit}      from 'angular2/core';
import {CanActivate, Router}    from 'angular2/router';
import {ROUTER_DIRECTIVES, Router, RouteConfig, CanActivate, RouterOutlet} from 'angular2/router';

import {User}           from '../../models/user';
import {UserService}    from '../../services/user.service';

import {UsersComponent} from "./users/users.component";
import {UserDetail}     from "./users/userDetail/user-detail.component";

import {authCheck}              from "../../common/auth-check"
import {ComponentInstruction}   from "../../../node_modules/angular2/src/router/instruction";

@Component({
    selector: 'user-management',
    templateUrl: 'app/components/userManagement/user.management.component.html',
    styleUrls: ['app/components/userManagement/user.management.component.css'],
    directives: [RouterOutlet, ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/users', name: 'Users', component: UsersComponent, useAsDefault: true},
    {path: '/users/userDetail/:id', name: 'UserDetail', component: UserDetail}
])

@CanActivate((next:ComponentInstruction, previous:ComponentInstruction) => {
    return authCheck(next, previous);
})

export class UserManagementComponent {

    public title = 'User Management';
    public user:User;
    public users: Array<User>;

    constructor(private _userService:UserService) {
    }

    ngOnInit() {
        this._userService.user$.subscribe(updatedUser => this.user = updatedUser);
        this._userService.users$.subscribe(users => this.users = users);
        this._userService.loggedInCheck();
        this._userService.getUsers();
    }

}
