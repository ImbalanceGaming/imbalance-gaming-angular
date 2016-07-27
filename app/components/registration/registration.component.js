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
var user_1 = require('../../models/user');
var auth_service_1 = require("../../services/auth.service");
var messages_directive_1 = require("../../directives/messages/messages.directive");
var RegistrationComponent = (function () {
    function RegistrationComponent(_route, _authService, _router) {
        this._route = _route;
        this._authService = _authService;
        this._router = _router;
        this.title = 'Registration';
        this.user = new user_1.User();
        this.regSuccess = false;
        this.activating = false;
        // Uncomment below for testing
        // this.user.username = 'chris';
        // this.user.email = 'chrispratt1985@gmail.com';
        // this.regPassword = '10Banana12';
        // this.user.forename = 'Christopher';
        // this.user.surname = 'Pratt';
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                _this.activating = true;
                _this._authService.activate(id);
            }
        });
    };
    RegistrationComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    RegistrationComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = {
            username: this.user.username,
            password: this.regPassword,
            email: this.user.email,
            forename: this.user.forename,
            surname: this.user.surname
        };
        this._authService.register(data).then(function (complete) {
            if (complete) {
                _this.regSuccess = true;
            }
        });
    };
    RegistrationComponent.prototype.onBack = function () {
        this._router.navigate(['/login']);
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'my-registration',
            templateUrl: 'app/components/registration/registration.component.html',
            styleUrls: ['app/components/registration/registration.component.css'],
            directives: [messages_directive_1.MessagesDirective]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, auth_service_1.AuthService, router_1.Router])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map