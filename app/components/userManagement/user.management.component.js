System.register(['angular2/core', 'angular2/router', '../../services/user.service', "./users/users.component", "./users/userDetail/user-detail.component", "../../common/auth-check"], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, user_service_1, users_component_1, user_detail_component_1, auth_check_1;
    var UserManagementComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (users_component_1_1) {
                users_component_1 = users_component_1_1;
            },
            function (user_detail_component_1_1) {
                user_detail_component_1 = user_detail_component_1_1;
            },
            function (auth_check_1_1) {
                auth_check_1 = auth_check_1_1;
            }],
        execute: function() {
            UserManagementComponent = (function () {
                function UserManagementComponent(_userService) {
                    this._userService = _userService;
                    this.title = 'User Management';
                }
                UserManagementComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.user$.subscribe(function (updatedUser) { return _this.user = updatedUser; });
                    this._userService.users$.subscribe(function (users) { return _this.users = users; });
                    this._userService.loggedInCheck();
                    this._userService.getUsers();
                };
                UserManagementComponent = __decorate([
                    core_1.Component({
                        selector: 'user-management',
                        templateUrl: 'app/components/userManagement/user.management.component.html',
                        styleUrls: ['app/components/userManagement/user.management.component.css'],
                        directives: [router_2.RouterOutlet, router_2.ROUTER_DIRECTIVES]
                    }),
                    router_2.RouteConfig([
                        { path: '/users', name: 'Users', component: users_component_1.UsersComponent, useAsDefault: true },
                        { path: '/users/userDetail/:id', name: 'UserDetail', component: user_detail_component_1.UserDetail }
                    ]),
                    router_1.CanActivate(function (next, previous) {
                        return auth_check_1.authCheck(next, previous);
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService])
                ], UserManagementComponent);
                return UserManagementComponent;
            }());
            exports_1("UserManagementComponent", UserManagementComponent);
        }
    }
});
//# sourceMappingURL=user.management.component.js.map