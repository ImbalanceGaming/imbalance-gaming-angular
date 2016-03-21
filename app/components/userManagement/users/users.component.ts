import {Component, OnInit}      from 'angular2/core';
import {CanActivate, Router, ROUTER_DIRECTIVES}    from 'angular2/router';
import {NgForm}                 from 'angular2/common';

import {authCheck}            from "../../../common/auth-check"
import {ComponentInstruction} from "../../../../node_modules/angular2/src/router/instruction";

import {UserService}    from "../../../services/user.service";
import {User}           from "../../../models/user";
import {Message}        from "../../../models/message";

@Component({
    selector: 'users',
    templateUrl: 'app/components/userManagement/users/users.component.html',
    styleUrls: ['app/components/userManagement/users/users.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck(next, previous);
})

export class UsersComponent {

    public title            : string;
    public messages         : Array<Message>;
    public active           : boolean;
    public users            : Array<User>;
    public user1            : User;
    public user2            : User;
    public user3            : User;
    public selectedUser     : User;

    constructor(private _userService:UserService) {
        this.title = 'Users';
        this.active = true;

        this.user1 = new User();
        this.user2 = new User();
        this.user3 = new User();

        this.messages = [];
    }

    ngOnInit() {
        this._userService.users$.subscribe(updatedUser => this.users = updatedUser);
        this._userService.messages$.subscribe(updatedMessages => this.messages = updatedMessages);
        this._userService.getUsers();
    }

    onSubmit() {
        this._userService.clearMessage();

        if (this.user1.email) {
            this.user1.username = this.user1.forename.charAt(0) + '.' + this.user1.surname;

            this._userService.addUser(this.user1);
            this.user1 = new User();
        }

        if (this.user2.email) {
            this.user2.username = this.user2.forename.charAt(0) + '.' + this.user2.surname;

            this._userService.addUser(this.user2);
            this.user2 = new User();
        }

        if (this.user3.email) {
            this.user3.username = this.user3.forename.charAt(0) + '.' + this.user3.surname;

            this._userService.addUser(this.user3);
            this.user3 = new User();
        }

        this.active = false;
        setTimeout(()=> this.active=true, 1);
    }

}
