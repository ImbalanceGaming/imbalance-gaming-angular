import {Injectable}                 from 'angular2/core';
import {Http}                       from 'angular2/http';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import {Router}                     from 'angular2/router';
import 'rxjs/add/operator/share';

import {User}                       from '../models/user';
import {ApiService}                 from "./api.service";
import {Message}                    from "../models/message";

@Injectable()
export class UserService {

    user$:Observable<User>;
    users$:Observable<Array<User>>;
    messages$:Observable<Array<Message>>;

    private _userObserver : Observer<User>;
    private _usersObserver : Observer<Array<User>>;
    private _messagesObserver : Observer<Array<Message>>;

    private _user         : User;
    private _users        : Array<User>;

    private _messages     : Array<Message>;

    constructor(private _apiService:ApiService, private _router:Router) {
        this._user = new User();
        this._users = [];

        this.user$ = Observable.create(observer => this._userObserver = observer).share();
        this.users$ = Observable.create(observer => this._usersObserver = observer).share();
        this.messages$ = Observable.create(observer => this._messagesObserver = observer).share();

        this._messages = [];
    }

    get user():User {
        return this._user;
    }

    set user(value:User) {
        this._user = value;
    }

    get users():Array<User> {
        return this._users;
    }

    set users(value:Array<User>) {
        this._users = value;
    }

    get messages():Array<> {
        return this._messages;
    }

    set messages(value:Array<>) {
        this._messages = value;
    }

    public setBasicUserDetails(userData) {
        this._user.email = userData.email;
        this._user.id = userData.id;
        this._user.username = userData.username;
        this._user.role = userData.role;
        this._user.loggedIn = true;
        this._userObserver.next(this.user);
    }

    public setExtendedUserDetails(userData) {
        this._user.forename = userData.forename;
        this._user.surname = userData.surname;
        this._user.dob = userData.dob;
        this._user.country = userData.country;
        this._user.website = userData.website;
        this._user.avatar = userData.avatar;
        this._user.twitterUsername = userData.twitterUsername;
        this._user.facebook = userData.facebook;
        this._userObserver.next(this.user);
    }

    public getUsers() {
        this._apiService.getWithAuth('usersWithDetails')
            .subscribe(
                data => this.buildUsersData(data),
                error => console.log(error)
            )
    }

    // Check that the user is logged in by first checking that they have
    // a token set and if so is that token still valid
    public loggedInCheck() {
        if (localStorage.getItem('jwt')) {
            this._apiService.getWithAuth('loginUser')
                .subscribe(
                    data => this.setBasicUserDetails(data),
                    error => this._router.navigate(['Login']),
                    () => this.getFullUserDetails()
                );
        }
    }

    public addUser(user: User) {
        let data = {
            username: user.username,
            email : user.email,
            forename : user.forename,
            surname : user.surname
        };

        this._apiService.postWithAuth('users', data).subscribe(
            data => this.processMessages(data.success.message, true),
            error => this.processMessages(error.message, false),
            () => this.getUsers()
        );
    }

    public getUser(id: number) {
        return Promise.resolve(this._users).then(
            users => users.filter(user => user.id === id)[0]
        );
    }

    public updateUser(user: User) {
        let data = {
            role : user.role,
            email : user.email,
            forename : user.forename,
            surname : user.surname
        };

        this._apiService.patch('users/'+user.id, data).subscribe(
            data => this.processMessages(data.success.message, true),
            error => this.processMessages(error.message, false)
        );
    }

    public clearMessage() {
        this._messages = [];
        this._messagesObserver.next(this._messages);
    }

    private processMessages(message: string, success: boolean) {
        let messageObject : Message;
        if (success) {
            messageObject = {
                success : message,
                error : null
            };
            this._messages.push(messageObject);
            this._messagesObserver.next(this._messages);
        } else {
            messageObject = {
                success : null,
                error : message
            };
            this._messages.push(messageObject);
            this._messagesObserver.next(this._messages);
        }
    }

    private getFullUserDetails() {
        this._apiService.getWithAuth('user/'+this._user.id+'/userDetail')
            .subscribe(
                data => this.setExtendedUserDetails(data.data),
                error => console.log(error)
            );
    }

    /**
     * Build users array from server data
     *
     * @param {Object[]} usersData
     */
    private buildUsersData(usersData) {

        this._users = [];

        usersData.data.forEach((userData) => {
            //noinspection TypeScriptUnresolvedVariable
            let userInfo = userData.user;
            //noinspection TypeScriptUnresolvedVariable
            let userDetails = userData.userDetails;

            let user = new User();
            user.email = userInfo.email;
            user.id = userInfo.id;
            user.username = userInfo.username;
            user.role = userInfo.role;
            user.lastLogin = userInfo.lastLogin;
            user.forename = userDetails.forename;
            user.surname = userDetails.surname;
            user.dob = userDetails.dob;
            user.country = userDetails.country;
            user.website = userDetails.website;
            user.avatar = userDetails.avatar;
            user.twitterUsername = userDetails.twitterUsername;
            user.facebook = userDetails.facebook;

            this._users.push(user);
        }, this);

        this._usersObserver.next(this._users);

    }

}
