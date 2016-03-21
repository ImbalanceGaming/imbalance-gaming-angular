System.register(['angular2/core', 'angular2/router', "../../../../models/user", "../../../../services/user.service"], function(exports_1, context_1) {
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
    var core_1, router_1, user_1, user_service_1;
    var UserDetail;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            UserDetail = (function () {
                function UserDetail(_userService, _routeParams) {
                    var _this = this;
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this._userService.messages$.subscribe(function (updatedMessages) { return _this.messages = updatedMessages; });
                    this.title = 'User Detail';
                    this.user = new user_1.User();
                    this.roles = ['User', 'Developer', 'Administrator'];
                }
                UserDetail.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.users$.subscribe(function (updatedUser) { return _this.users = updatedUser; });
                    var id = +this._routeParams.get('id');
                    this._userService.getUser(id)
                        .then(function (user) { return _this.user = user; });
                };
                UserDetail.prototype.selectRole = function (role) {
                    this.user.role = role.target.value;
                };
                UserDetail.prototype.onSubmit = function () {
                    this._userService.clearMessage();
                    this._userService.updateUser(this.user);
                };
                UserDetail = __decorate([
                    core_1.Component({
                        selector: 'user-detail',
                        templateUrl: 'app/components/userManagement/users/userDetail/user-detail.component.html',
                        styleUrls: ['app/components/userManagement/users/userDetail/user-detail.component.css']
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.RouteParams])
                ], UserDetail);
                return UserDetail;
            }());
            exports_1("UserDetail", UserDetail);
        }
    }
});
//# sourceMappingURL=user-detail.component.js.map