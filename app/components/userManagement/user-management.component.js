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
var module_1 = require("../../models/module");
var module_service_1 = require("../../services/module.service");
var UserManagementComponent = (function () {
    function UserManagementComponent(_authService, _moduleService) {
        this._authService = _authService;
        this._moduleService = _moduleService;
        this.title = 'User Management';
        this._module = new module_1.Module();
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._moduleService.module$.subscribe(function (module) { return _this._module = module; });
        this._moduleService.firstCall();
    };
    UserManagementComponent = __decorate([
        core_1.Component({
            selector: 'user-management',
            templateUrl: 'app/components/userManagement/user-management.component.html',
            styleUrls: ['app/components/userManagement/user-management.component.css'],
            directives: [router_1.RouterOutlet, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, module_service_1.ModuleService])
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
//# sourceMappingURL=user-management.component.js.map