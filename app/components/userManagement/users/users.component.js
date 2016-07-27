"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_service_1 = require("../../../services/user.service");
var user_1 = require("../../../models/user");
var table_directive_1 = require("../../../directives/tables/table.directive");
var messages_directive_1 = require("../../../directives/messages/messages.directive");
var permission_1 = require("../../../models/permission");
var auth_service_1 = require("../../../services/auth.service");
var UsersComponent = (function () {
    function UsersComponent(_userService, _authService) {
        this._userService = _userService;
        this._authService = _authService;
        this.users = [];
        this._moduleSectionName = 'User Management';
        this.pagePermission = new permission_1.Permission();
        this.title = 'Users';
        this.active = true;
        this.user1 = new user_1.User();
        this.user2 = new user_1.User();
        this.user3 = new user_1.User();
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.users$.subscribe(function (updatedUser) { return _this.users = updatedUser; });
        this._userService.getUsers(1, true, true);
        this._authService.getPagePermissions(this._moduleSectionName)
            .then(function (permission) { return _this.pagePermission = permission; });
    };
    UsersComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.user1.email) {
            this.user1.username = this.user1.forename.charAt(0) + '.' + this.user1.surname;
            this._userService.add(this.user1);
            this.user1 = new user_1.User();
        }
        if (this.user2.email) {
            this.user2.username = this.user2.forename.charAt(0) + '.' + this.user2.surname;
            this._userService.add(this.user2);
            this.user2 = new user_1.User();
        }
        if (this.user3.email) {
            this.user3.username = this.user3.forename.charAt(0) + '.' + this.user3.surname;
            this._userService.add(this.user3);
            this.user3 = new user_1.User();
        }
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 1);
    };
    UsersComponent.prototype.pageChanged = function (event) {
        this._userService.getUsers(event, true, true);
        return event;
    };
    UsersComponent.prototype.setActiveStatus = function (id) {
        this._userService.setActiveStatus(id);
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'users',
            templateUrl: 'app/components/userManagement/users/users.component.html',
            styleUrls: ['app/components/userManagement/users/users.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, table_directive_1.TableDirective, messages_directive_1.MessagesDirective]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, auth_service_1.AuthService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map