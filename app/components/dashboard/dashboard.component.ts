import {Component}      from 'angular2/core';

import {User}           from 'models/user';
import {UserService}    from 'services/user.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html'
})

export class DashboardComponent {

    public title = 'My Dashboard';
    public user : User;

    constructor(private _userService:UserService) {
        this.user = this._userService.user;
    }

}
