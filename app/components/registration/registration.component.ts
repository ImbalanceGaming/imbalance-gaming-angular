import {Component}  from 'angular2/core';
import {Router, RouteParams}     from 'angular2/router';

import {UserService}    from '../../services/user.service';
import {ApiService}     from '../../services/api.service';
import {User}           from '../../models/user';
import {HelpersService} from "../../services/helpers.service";

@Component({
    selector: 'my-registration',
    templateUrl: 'app/components/registration/registration.component.html',
    styleUrls: ['app/components/registration/registration.component.css']
})

export class RegistrationComponent {

    public title    : string;
    public regError : any;
    public regSuccess : string;
    public regPassword : string;
    public activating : boolean;
    public user     : User;

    constructor(
        private _userService:UserService,
        private _apiService:ApiService,
        private _routeParams: RouteParams,
        private _helpersService:HelpersService
    ) {
        this.title = 'Registration';
        this.user = new User();
        this._userService.user$.subscribe(updatedUser => this.user = updatedUser);
        this.regSuccess = null;
        this.activating = false;
        this.regError = {
            error: false
        };

        // Uncomment below for testing
        //this.user.username = 'chris';
        //this.user.email = 'chrispratt1985@gmail.com';
        //this.regPassword = '10Banana12';
        //this.user.forename = 'Christopher';
        //this.user.surname = 'Pratt';
    }

    ngOnInit() {
        if (this._routeParams.get('id')) {
            let id = +this._routeParams.get('id');
            this.activating = true;
            this.activate(id);
        }
    }

    onSubmit() {
        let data = {
            username: this.user.username,
            password: this.regPassword,
            email : this.user.email,
            forename : this.user.forename,
            surname : this.user.surname
        };

        //noinspection TypeScriptUnresolvedVariable
        this._apiService.post('register', data).subscribe(
            data => this.regSuccess = data.success.message,
            error => this.regError = this._helpersService.processErrors(error),
            () => {
                this.regError.error = false
            }
        );
    }

    private activate(id) {
        let data = {id:id};

        this._apiService.post('activate', data).subscribe(
            data => null,
            error => this.regError = this._helpersService.processErrors(error)
        )
    }

}
