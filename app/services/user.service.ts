import {Injectable}                 from 'angular2/core';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {User}                       from '../models/user';
import {ApiService}                 from "./api.service";
import {MessagesService}            from "../directives/messages/messages.service";
import {TableService}               from "../directives/tables/table.service";
import {TableDataService}           from "./table-data.service";
import {ServiceInterface}           from "../interfaces/service.interface";

@Injectable()
export class UserService implements ServiceInterface {

    user$:Observable<User>;
    users$:Observable<Array<User>>;

    private _userObserver : Observer<User>;
    private _usersObserver : Observer<Array<User>>;

    private _user : User = new User();
    private _users: Array<User> = [];

    constructor(
        private _apiService:ApiService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService
    ) {
        this.user$ = Observable.create(observer => this._userObserver = observer).share();
        this.users$ = Observable.create(observer => this._usersObserver = observer).share();
    }

    setUserDetails(userData) {

        this._user.email = userData.email;
        this._user.id = userData.id;
        this._user.username = userData.username;
        this._user.role = userData.role;
        this._user.last_login = userData.last_login;
        this._user.active = userData.active;
        this._user.loggedIn = true;
        this._user.forename = userData.forename;
        this._user.surname = userData.surname;
        this._user.dob = userData.dob;
        this._user.country = userData.country;
        this._user.website = userData.website;
        this._user.avatar = userData.avatar;
        this._user.twitter_username = userData.twitter_username;
        this._user.facebook = userData.facebook;
        this._user.has_dev_area = userData.has_dev_area;
        this._userObserver.next(this._user);

    }

    create(userData) : User {

        let user = new User();
        user.email = userData.email;
        user.id = userData.id;
        user.username = userData.username;
        user.role = userData.role;
        user.last_login = userData.last_login;
        user.active = userData.active;
        user.forename = userData.forename;
        user.surname = userData.surname;
        user.dob = userData.dob;
        user.country = userData.country;
        user.website = userData.website;
        user.avatar = userData.avatar;
        user.twitter_username = userData.twitter_username;
        user.facebook = userData.facebook;
        user.has_dev_area = userData.has_dev_area;
        return user;

    }

    get(id: number) : Promise {

        return Promise.resolve(this._users).then(
            users => users.filter(user => user.id === id)[0]
        );

    }

    getUsers(page:number = 1, queryAPI:boolean = false, buildTableData:boolean = false) : Promise {

        if (this._users.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('users?page='+page)
                .then(
                    data => this.buildUsers(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._users).then(users => {
                this.setUsers(users);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }

    }

    getUserWithPermissions() : Promise {

        return this._apiService.getPromiseWithAuth('findPermissionsForUser/'+this._user.id)
            .then(
                data => {return data},
                error => console.log(error)
            );

    }

    set(user: User) {

        this._user = user;
        this._userObserver.next(this._user);

    }

    setUsers(users: Array<User>) {

        this._users = users;
        this._usersObserver.next(this._users);

    }

    add(user: User) {

        this._apiService.postWithAuth('users', this.generateData(user)).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            },
            () => {
                this.getUsers(1, true, true).then(() => {
                    this.getUsers(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    update(user: User) {

        this._apiService.patch('users/'+user.id, this.generateData(user)).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            }
        );

    }

    delete(user: User) {

        this._apiService.delete('users/'+user.id).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            },
            () => {
                this.getUsers(1, true, true).then(() => {
                    this.getUsers(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    generateData(user: User) : any {

        return {
            role : user.role,
            email : user.email,
            forename : user.forename,
            surname : user.surname,
            username : user.username,
            has_dev_area: user.has_dev_area
        };

    }

    setActiveStatus(id: number) {

        this._apiService.patch('setActiveStatus/'+id, {}).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            },
            () => {
                this.get(id).then(user => {
                    let userObject = user;
                    userObject.active = (userObject.active)?false:true;
                    this.updateUserInUsers(userObject);
                });
            }
        );

    }

    findUsers(searchTerm: string) {

        return this._apiService.getPromiseWithAuth('findUsers/'+searchTerm)
            .then(
                data => {
                    let userData = [];
                    data.data.forEach(user => {
                        userData.push({
                            id: user.id,
                            name: user.forename + " " + user.surname
                        });
                    });
                    return userData;
                },
                error => {
                    return [];
                }
            );

    }

    private updateUserInUsers(user: User) {

        this._users.forEach(function (userObject:User, index) {
            if (user.id === userObject.id) {
                this._users[index] = user;
            }
        }, this);

        this._usersObserver.next(this._users);
        this.updateTable();

    }

    /**
     * Build users array from server data
     *
     * @param {Object[]} usersData
     * @param {boolean} buildTableData
     * @param {Object[]} usersData.data
     * @param {Object} usersData.data.user
     * @param {Object} usersData.data.userDetails
     * @param {Object} usersData.paginator
     * @param {Object} usersData.paginator.per_page
     * @param {Object} usersData.paginator.last_page
     * @param {Object} usersData.paginator.current_page
     */
    private buildUsers(usersData, buildTableData = false) {

        this._users = [];

        for(let key in usersData.data) {
            let userInfo;

            if (usersData.data.hasOwnProperty(key)) {
                userInfo = usersData.data[key];
            }

            let user = new User();
            user.email = userInfo.email;
            user.id = userInfo.id;
            user.username = userInfo.username;
            user.role = userInfo.role;
            user.last_login = userInfo.last_login;
            user.active = userInfo.active;
            user.forename = userInfo.forename;
            user.surname = userInfo.surname;
            user.dob = userInfo.dob;
            user.country = userInfo.country;
            user.website = userInfo.website;
            user.avatar = userInfo.avatar;
            user.twitter_username = userInfo.twitter_username;
            user.facebook = userInfo.facebook;
            user.has_dev_area = userInfo.has_dev_area;

            this._users.push(user);
        }

        this.setUsers(this._users);

        if (buildTableData) {
            this._tableDataService.getUsersTableData(this._users, true, usersData.paginator)
                .then(table => this._tableService.addTable(table));
        }

        return this._users;

    }

    private updateTable() {
        this._tableDataService.getUsersTableData(this._users, false)
            .then(table => this._tableService.addTable(table));
    }

}
