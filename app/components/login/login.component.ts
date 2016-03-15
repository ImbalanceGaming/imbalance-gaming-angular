import {Component}  from 'angular2/core';
import {NgForm}     from 'angular2/common';
import {Router}     from 'angular2/router';

import {UserService}    from 'services/user.service';
import {ApiService}     from "services/api.service";
import {User}           from "models/user";

@Component({
    selector: 'my-login',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css']
})

export class LoginComponent {

    public title        : string;
    public loginError   : any;
    public userPassword : string;
    public userEmail    : string;

    private _submitted:boolean;

    constructor(private _apiService:ApiService, private _router:Router, private _userService:UserService) {
        this.title = 'Login';
        this._submitted = false;
        this.loginError = {
            error: false
        };
    }

    onSubmit() {
        this._submitted = true;
        this._apiService.authenticate({email: this.userEmail, password: this.userPassword})
            .subscribe(
                data => this.saveJwt(data.token),
                err => this.processErrors(err),
                () => this.loginError.error = false
            );

    }

    private processErrors(err) {

        this.loginError = {
            error: true,
            message: err.message,
            code: err.code
        };

    }

    private saveJwt(jwt) {
        if (jwt) {
            localStorage.setItem('id_token', jwt);
            this._apiService.getAuthenticatedUser()
                .subscribe(
                    data => this._userService.setBasicUserDetails(data),
                    err => this.processErrors(err),
                    () => this._router.navigate(['Dashboard'])
                );
        }
    }

}
