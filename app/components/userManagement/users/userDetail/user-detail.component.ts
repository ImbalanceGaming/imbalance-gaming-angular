import {Component, OnInit}      from 'angular2/core';
import {CanActivate, Router, RouteParams}    from 'angular2/router';
import {NgForm}                 from 'angular2/common';

import {User}           from "../../../../models/user";
import {UserService}    from "../../../../services/user.service";
import {Message}        from "../../../../models/message";

@Component({
    selector: 'user-detail',
    templateUrl: 'app/components/userManagement/users/userDetail/user-detail.component.html',
    styleUrls: ['app/components/userManagement/users/userDetail/user-detail.component.css']
})

export class UserDetail {

    public title    : string;
    public users    : Array<User>;
    public user     : User;
    public roles    : Array<string>;
    public messages : Array<Message>;

    constructor(private _userService:UserService, private _routeParams: RouteParams) {
        this._userService.messages$.subscribe(updatedMessages => this.messages = updatedMessages);
        this.title = 'User Detail';
        this.user = new User();
        this.roles = ['User', 'Developer', 'Administrator'];
    }

    ngOnInit() {
        this._userService.users$.subscribe(updatedUser => this.users = updatedUser);
        let id = +this._routeParams.get('id');
        this._userService.getUser(id)
            .then(user => this.user = user);
    }

    selectRole(role) {
        this.user.role = role.target.value;
    }

    onSubmit() {
        this._userService.clearMessage();

        this._userService.updateUser(this.user);
    }

}