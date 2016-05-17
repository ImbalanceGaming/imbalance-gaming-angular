import {Component}  from 'angular2/core';
import {Router, RouteParams}     from 'angular2/router';

import {User}           from '../../models/user';
import {AuthService} from "../../services/auth.service";
import {MessagesDirective} from "../../directives/messages/messages.directive";

@Component({
    selector: 'my-registration',
    templateUrl: 'app/components/registration/registration.component.html',
    styleUrls: ['app/components/registration/registration.component.css'],
    directives: [MessagesDirective]
})

export class RegistrationComponent {

    public title    : string;
    public regSuccess : boolean;
    public regPassword : string;
    public activating : boolean;
    public user : User;

    constructor(
        private _routeParams: RouteParams,
        private _authService: AuthService,
        private _router: Router
    ) {
        this.title = 'Registration';
        this.user = new User();
        this.regSuccess = false;
        this.activating = false;

        // Uncomment below for testing
        // this.user.username = 'chris';
        // this.user.email = 'chrispratt1985@gmail.com';
        // this.regPassword = '10Banana12';
        // this.user.forename = 'Christopher';
        // this.user.surname = 'Pratt';
    }

    ngOnInit() {
        if (this._routeParams.get('id')) {
            let id = +this._routeParams.get('id');
            this.activating = true;
            this._authService.activate(id);
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

        this._authService.register(data).then(complete => {
            if (complete) {
                this.regSuccess = true;
            }
        });
    }

    onBack() {
        this._router.navigate(['Login']);
    }

}
