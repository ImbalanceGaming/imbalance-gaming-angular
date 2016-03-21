System.register(['angular2/core', 'angular2/router', "../../../common/auth-check", "../../../services/user.service", "../../../models/user"], function(exports_1, context_1) {
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
    var core_1, router_1, auth_check_1, user_service_1, user_1;
    var UsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_check_1_1) {
                auth_check_1 = auth_check_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(_userService) {
                    this._userService = _userService;
                    this.title = 'Users';
                    this.active = true;
                    this.user1 = new user_1.User();
                    this.user2 = new user_1.User();
                    this.user3 = new user_1.User();
                    this.messages = [];
                }
                UsersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.users$.subscribe(function (updatedUser) { return _this.users = updatedUser; });
                    this._userService.messages$.subscribe(function (updatedMessages) { return _this.messages = updatedMessages; });
                    this._userService.getUsers();
                };
                UsersComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._userService.clearMessage();
                    if (this.user1.email) {
                        this.user1.username = this.user1.forename.charAt(0) + '.' + this.user1.surname;
                        this._userService.addUser(this.user1);
                        this.user1 = new user_1.User();
                    }
                    if (this.user2.email) {
                        this.user2.username = this.user2.forename.charAt(0) + '.' + this.user2.surname;
                        this._userService.addUser(this.user2);
                        this.user2 = new user_1.User();
                    }
                    if (this.user3.email) {
                        this.user3.username = this.user3.forename.charAt(0) + '.' + this.user3.surname;
                        this._userService.addUser(this.user3);
                        this.user3 = new user_1.User();
                    }
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 1);
                };
                UsersComponent = __decorate([
                    core_1.Component({
                        selector: 'users',
                        templateUrl: 'app/components/userManagement/users/users.component.html',
                        styleUrls: ['app/components/userManagement/users/users.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return auth_check_1.authCheck(next, previous);
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_1("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=users.component.js.map