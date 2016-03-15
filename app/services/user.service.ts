import {Injectable}                 from 'angular2/core';
import {Http}                       from 'angular2/http';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {User}                       from 'models/user';
import {ApiService}                 from "services/api.service";

@Injectable()
export class UserService {

    user$: Observable<User>;
    private _userObserver: Observer<User>;
    private _user : User = {
        id: 0,
        username: '',
        fullName: '',
        email: ''
    };
    private _error : any;

    constructor(private _apiService:ApiService) {
        this._error = null;
        this.user$ = new Observable(observer => this._userObserver = observer).share();
    }

    get user():User {
        return this._user;
    }

    set user(value:User) {
        this._user = value;
    }

    get error():any {
        return this._error;
    }

    set error(value:any) {
        this._error = value;
    }

    setBasicUserDetails(userData) {
        this.user.email = userData.email;
        this.user.id = userData.id;
        this.user.username = userData.username;
    }

}
