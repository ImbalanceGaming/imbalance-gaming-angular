import {Component}              from '@angular/core';

import {User}           from '../../models/user';
import {UserService}    from '../../services/user.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent {

    public title = 'My Dashboard';
    public user : User;

    constructor(
        private _userService:UserService
    ) {
        
    }

    ngOnInit() {
        this._userService.user$.subscribe(updatedUser => this.user = updatedUser);
    }

}
