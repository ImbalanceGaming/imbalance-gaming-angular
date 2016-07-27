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
var api_service_1 = require("./api.service");
var user_service_1 = require("./user.service");
var module_service_1 = require("./module.service");
var module_1 = require("../models/module");
var user_1 = require("../models/user");
var messages_service_1 = require("../directives/messages/messages.service");
var AuthService = (function () {
    function AuthService(_router, _apiService, _userService, _moduleService, _messageService) {
        this._router = _router;
        this._apiService = _apiService;
        this._userService = _userService;
        this._moduleService = _moduleService;
        this._messageService = _messageService;
        this.validUser = false;
        this._module = new module_1.Module();
    }
    AuthService.prototype.setup = function (moduleName) {
        var _this = this;
        this._moduleService.module$.subscribe(function (module) { return _this._module = module; });
        this._moduleService.getModule(moduleName).then(function () {
            _this.loggedInCheck();
        });
    };
    AuthService.prototype.loggedInCheck = function () {
        var _this = this;
        // Check that the user is logged in by first checking that they have
        // a token set and if so is that token still valid
        if (localStorage.getItem('jwt')) {
            this._apiService.getWithAuth('loginUser')
                .subscribe(function (data) { return _this.keyValid(data); }, function (error) { return _this.keyInvalid(); });
        }
    };
    AuthService.prototype.moduleAccess = function () {
        if (this._module.permission.view) {
            return true;
        }
        else {
            this._router.navigate(['/login']);
        }
    };
    AuthService.prototype.getPagePermissions = function (sectionName) {
        return this._moduleService.getSection(sectionName).then(function (moduleSection) {
            return moduleSection.permission;
        });
    };
    AuthService.prototype.login = function (loginData) {
        var _this = this;
        this._apiService.post('login', loginData)
            .subscribe(function (data) {
            _this.saveJwt(data.token);
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    AuthService.prototype.logout = function () {
        var user = new user_1.User();
        this._userService.set(user);
        localStorage.clear();
        this._router.navigate(['/login']);
    };
    AuthService.prototype.activate = function (id) {
        var _this = this;
        var data = { id: id };
        this._apiService.post('activate', data).subscribe(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    AuthService.prototype.register = function (regData) {
        var _this = this;
        //noinspection TypeScriptUnresolvedVariable
        return this._apiService.postPromise('register', regData).then(function (data) {
            if (data.success) {
                _this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                });
                return true;
            }
            else {
                _this._messageService.addMessage({
                    success: null,
                    error: data.error.message
                });
                return false;
            }
        });
    };
    AuthService.prototype.keyValid = function (userData) {
        var _this = this;
        if (!this.validUser) {
            this.validUser = true;
            this._userService.setUserDetails(userData);
            this._moduleService.setPermissions().then(function () {
                _this.moduleAccess();
            });
        }
    };
    AuthService.prototype.keyInvalid = function () {
        this._router.navigate(['/login']);
    };
    AuthService.prototype.saveJwt = function (jwt) {
        var _this = this;
        if (jwt != null) {
            localStorage.setItem('jwt', jwt);
            this._apiService.getWithAuth('loginUser')
                .subscribe(function (data) {
                _this._userService.setUserDetails(data);
            }, function (error) {
                _this._messageService.addMessage({
                    success: null,
                    error: error.message
                });
            }, function () {
                _this._router.navigate(['/dashboard']);
                _this._moduleService.setPermissions();
            });
        }
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, api_service_1.ApiService, user_service_1.UserService, module_service_1.ModuleService, messages_service_1.MessagesService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map