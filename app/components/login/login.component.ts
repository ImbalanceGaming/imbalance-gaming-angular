import {Component}  from 'angular2/core';
import {Router, ROUTER_DIRECTIVES}     from 'angular2/router';

import {UserService}    from '../../services/user.service';
import {ApiService}     from '../../services/api.service';
import {HelpersService} from "../../services/helpers.service";
import {ModuleService} from "../../services/module.service";

@Component({
    selector: 'my-login',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {

    public title        : string;
    public userPassword : string;
    public userEmail    : string;
    public loginError   : any;

    private _submitted:boolean;

    constructor(
        private _apiService:ApiService,
        private _router:Router,
        private _userService:UserService,
        private _helpersService:HelpersService,
        private _moduleService:ModuleService
    ) {
        this.title = 'Login';
        this._submitted = false;
        this.loginError = {
            error: false
        };
    }

    onSubmit() {
        this._submitted = true;
        let data = {
            email: this.userEmail,
            password: this.userPassword
        };

        this._apiService.post('login', data)
            .subscribe(
                data => this.saveJwt(data.token),
                error => this.loginError = this._helpersService.processErrors(error),
                () => this.loginError.error = false
            );

    }

    private saveJwt(jwt) {
        if (jwt != null) {
            localStorage.setItem('jwt', jwt);
            this._apiService.getWithAuth('loginUser')
                .subscribe(
                    data => this._userService.setUserDetails(data),
                    error => this.loginError = this._helpersService.processErrors(error),
                    () => {
                        this._router.navigate(['Dashboard']);
                        this._moduleService.setPermissions();
                    }
                );
        }
    }

}
