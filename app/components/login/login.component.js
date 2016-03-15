System.register(['angular2/core', 'angular2/router', 'services/user.service', "services/api.service"], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, api_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_apiService, _router, _userService) {
                    this._apiService = _apiService;
                    this._router = _router;
                    this._userService = _userService;
                    this.title = 'Login';
                    this._submitted = false;
                    this.loginError = {
                        error: false
                    };
                }
                LoginComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._submitted = true;
                    this._apiService.authenticate({ email: this.userEmail, password: this.userPassword })
                        .subscribe(function (data) { return _this.saveJwt(data.token); }, function (err) { return _this.processErrors(err); }, function () { return _this.loginError.error = false; });
                };
                LoginComponent.prototype.processErrors = function (err) {
                    this.loginError = {
                        error: true,
                        message: err.message,
                        code: err.code
                    };
                };
                LoginComponent.prototype.saveJwt = function (jwt) {
                    var _this = this;
                    if (jwt) {
                        localStorage.setItem('id_token', jwt);
                        this._apiService.getAuthenticatedUser()
                            .subscribe(function (data) { return _this._userService.setBasicUserDetails(data); }, function (err) { return _this.processErrors(err); }, function () { return _this._router.navigate(['Dashboard']); });
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-login',
                        templateUrl: 'app/components/login/login.component.html',
                        styleUrls: ['app/components/login/login.component.css']
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof api_service_1.ApiService !== 'undefined' && api_service_1.ApiService) === 'function' && _a) || Object, router_1.Router, (typeof (_b = typeof user_service_1.UserService !== 'undefined' && user_service_1.UserService) === 'function' && _b) || Object])
                ], LoginComponent);
                return LoginComponent;
                var _a, _b;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map