import {Component}              from 'angular2/core';
import {CanActivate, Router}    from 'angular2/router';

import {User}           from '../../models/user';
import {UserService}    from '../../services/user.service';
import {ApiService}     from "../../services/api.service";

import {authCheck} from "../../common/auth-check"
import {ComponentInstruction} from "../../../node_modules/angular2/src/router/instruction";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css']
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck(next, previous);
})

export class DashboardComponent {

    public title = 'My Dashboard';
    public user : User;

    constructor(
        private _userService:UserService,
        private _apiService:ApiService,
        private _router: Router
    ) {}

    ngOnInit() {
        this._userService.user$.subscribe(updatedUser => this.user = updatedUser);
        this._userService.loggedInCheck();
    }

}
