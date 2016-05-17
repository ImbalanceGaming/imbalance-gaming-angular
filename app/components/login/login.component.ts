import {Component}  from 'angular2/core';
import {ROUTER_DIRECTIVES}     from 'angular2/router';

import {AuthService} from "../../services/auth.service";
import {MessagesDirective} from "../../directives/messages/messages.directive";

@Component({
    selector: 'my-login',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css'],
    directives: [ROUTER_DIRECTIVES, MessagesDirective]
})

export class LoginComponent {

    public title        : string;
    public userPassword : string;
    public userEmail    : string;

    constructor(
        private _authService: AuthService
    ) {
        this.title = 'Login';
    }

    onSubmit() {
        let data = {
            email: this.userEmail,
            password: this.userPassword
        };

        this._authService.login(data);
    }

}
