System.register(['angular2/core', 'rxjs/Observable', 'angular2/router', 'rxjs/add/operator/share', '../models/user', "./api.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, router_1, user_1, api_service_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {},
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(_apiService, _router) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._router = _router;
                    this._user = new user_1.User();
                    this._users = [];
                    this.user$ = Observable_1.Observable.create(function (observer) { return _this._userObserver = observer; }).share();
                    this.users$ = Observable_1.Observable.create(function (observer) { return _this._usersObserver = observer; }).share();
                    this.messages$ = Observable_1.Observable.create(function (observer) { return _this._messagesObserver = observer; }).share();
                    this._messages = [];
                }
                Object.defineProperty(UserService.prototype, "user", {
                    get: function () {
                        return this._user;
                    },
                    set: function (value) {
                        this._user = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UserService.prototype, "users", {
                    get: function () {
                        return this._users;
                    },
                    set: function (value) {
                        this._users = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UserService.prototype, "messages", {
                    get: function () {
                        return this._messages;
                    },
                    set: function (value) {
                        this._messages = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                UserService.prototype.setBasicUserDetails = function (userData) {
                    this._user.email = userData.email;
                    this._user.id = userData.id;
                    this._user.username = userData.username;
                    this._user.role = userData.role;
                    this._user.loggedIn = true;
                    this._userObserver.next(this.user);
                };
                UserService.prototype.setExtendedUserDetails = function (userData) {
                    this._user.forename = userData.forename;
                    this._user.surname = userData.surname;
                    this._user.dob = userData.dob;
                    this._user.country = userData.country;
                    this._user.website = userData.website;
                    this._user.avatar = userData.avatar;
                    this._user.twitterUsername = userData.twitterUsername;
                    this._user.facebook = userData.facebook;
                    this._userObserver.next(this.user);
                };
                UserService.prototype.getUsers = function () {
                    var _this = this;
                    this._apiService.getWithAuth('usersWithDetails')
                        .subscribe(function (data) { return _this.buildUsersData(data); }, function (error) { return console.log(error); });
                };
                // Check that the user is logged in by first checking that they have
                // a token set and if so is that token still valid
                UserService.prototype.loggedInCheck = function () {
                    var _this = this;
                    if (localStorage.getItem('jwt')) {
                        this._apiService.getWithAuth('loginUser')
                            .subscribe(function (data) { return _this.setBasicUserDetails(data); }, function (error) { return _this._router.navigate(['Login']); }, function () { return _this.getFullUserDetails(); });
                    }
                };
                UserService.prototype.addUser = function (user) {
                    var _this = this;
                    var data = {
                        username: user.username,
                        email: user.email,
                        forename: user.forename,
                        surname: user.surname
                    };
                    this._apiService.postWithAuth('users', data).subscribe(function (data) { return _this.processMessages(data.success.message, true); }, function (error) { return _this.processMessages(error.message, false); }, function () { return _this.getUsers(); });
                };
                UserService.prototype.getUser = function (id) {
                    return Promise.resolve(this._users).then(function (users) { return users.filter(function (user) { return user.id === id; })[0]; });
                };
                UserService.prototype.updateUser = function (user) {
                    var _this = this;
                    var data = {
                        role: user.role,
                        email: user.email,
                        forename: user.forename,
                        surname: user.surname
                    };
                    this._apiService.patch('users/' + user.id, data).subscribe(function (data) { return _this.processMessages(data.success.message, true); }, function (error) { return _this.processMessages(error.message, false); });
                };
                UserService.prototype.clearMessage = function () {
                    this._messages = [];
                    this._messagesObserver.next(this._messages);
                };
                UserService.prototype.processMessages = function (message, success) {
                    var messageObject;
                    if (success) {
                        messageObject = {
                            success: message,
                            error: null
                        };
                        this._messages.push(messageObject);
                        this._messagesObserver.next(this._messages);
                    }
                    else {
                        messageObject = {
                            success: null,
                            error: message
                        };
                        this._messages.push(messageObject);
                        this._messagesObserver.next(this._messages);
                    }
                };
                UserService.prototype.getFullUserDetails = function () {
                    var _this = this;
                    this._apiService.getWithAuth('user/' + this._user.id + '/userDetail')
                        .subscribe(function (data) { return _this.setExtendedUserDetails(data.data); }, function (error) { return console.log(error); });
                };
                /**
                 * Build users array from server data
                 *
                 * @param {Object[]} usersData
                 */
                UserService.prototype.buildUsersData = function (usersData) {
                    var _this = this;
                    this._users = [];
                    usersData.data.forEach(function (userData) {
                        //noinspection TypeScriptUnresolvedVariable
                        var userInfo = userData.user;
                        //noinspection TypeScriptUnresolvedVariable
                        var userDetails = userData.userDetails;
                        var user = new user_1.User();
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
                        _this._users.push(user);
                    }, this);
                    this._usersObserver.next(this._users);
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, router_1.Router])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map