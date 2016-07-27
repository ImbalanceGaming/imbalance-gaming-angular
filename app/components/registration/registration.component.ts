import {Component}  from '@angular/core';
import {Router, ActivatedRoute}     from '@angular/router';

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

    title    : string;
    regSuccess : boolean;
    regPassword : string;
    activating : boolean;
    user : User;

    private sub: any;

    constructor(
        private _route: ActivatedRoute,
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
        this.sub = this._route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                this.activating = true;
                this._authService.activate(id);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
        this._router.navigate(['/login']);
    }

}
