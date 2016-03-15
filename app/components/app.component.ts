import {Component, View, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

import {ApiService} from "services/api.service";
import {UserService}    from 'services/user.service';

import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from "./login/login.component";

@Component({
    selector: 'IGMS',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        ApiService,
        UserService
    ]
})

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    }
])

export class AppComponent implements OnInit {

    public title    : string;
    public userKey  : any;
    public loggedIn : boolean;
    public error    : any;

    constructor(private _apiService:ApiService, private _router: Router, private _userService:UserService) {
        this.title = 'IGMS';
        this.userKey = localStorage.getItem('id_token');
        this.loggedIn = false;
    }

    ngOnInit() {
        //this._userService.user$.subscribe(user => this.user = user);
        this.loggedInCheck();
    }

    private loggedInCheck() {
        if (this.userKey == 'undefined' || this.userKey == null) {
            this._router.navigate(['Login']);
        } else {
            this._apiService.getAuthenticatedUser()
                .subscribe(
                    data => this._userService.setBasicUserDetails(data),
                    error => this._router.navigate(['Login']),
                    () => {
                        this._router.navigate(['Dashboard']);
                        this.loggedIn = true;
                    }
                );
        }
    }

    //getData() {
    //    this._apiService.get('users').subscribe(
    //        data => this.data = data,
    //        err => console.error(err)
    //    );
    //}

}


