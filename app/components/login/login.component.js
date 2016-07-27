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
var auth_service_1 = require("../../services/auth.service");
var messages_directive_1 = require("../../directives/messages/messages.directive");
var LoginComponent = (function () {
    function LoginComponent(_authService) {
        this._authService = _authService;
        this.title = 'Login';
    }
    LoginComponent.prototype.onSubmit = function () {
        var data = {
            email: this.userEmail,
            password: this.userPassword
        };
        this._authService.login(data);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/components/login/login.component.html',
            styleUrls: ['app/components/login/login.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, messages_directive_1.MessagesDirective]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map