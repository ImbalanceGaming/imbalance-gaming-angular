System.register(['angular2/core', 'angular2/router', '../../services/user.service', '../../services/api.service', "../../services/helpers.service"], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, api_service_1, helpers_service_1;
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
            },
            function (helpers_service_1_1) {
                helpers_service_1 = helpers_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_apiService, _router, _userService, _helpersService) {
                    this._apiService = _apiService;
                    this._router = _router;
                    this._userService = _userService;
                    this._helpersService = _helpersService;
                    this.title = 'Login';
                    this._submitted = false;
                    this.loginError = {
                        error: false
                    };
                }
                LoginComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._submitted = true;
                    var data = {
                        email: this.userEmail,
                        password: this.userPassword
                    };
                    this._apiService.post('login', data)
                        .subscribe(function (data) { return _this.saveJwt(data.token); }, function (error) { return _this.loginError = _this._helpersService.processErrors(error); }, function () { return _this.loginError.error = false; });
                };
                LoginComponent.prototype.saveJwt = function (jwt) {
                    var _this = this;
                    if (jwt != null) {
                        localStorage.setItem('jwt', jwt);
                        this._apiService.getWithAuth('loginUser')
                            .subscribe(function (data) { return _this._userService.setBasicUserDetails(data); }, function (error) { return _this.loginError = _this._helpersService.processErrors(error); }, function () { return _this._router.navigate(['Dashboard']); });
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-login',
                        templateUrl: 'app/components/login/login.component.html',
                        styleUrls: ['app/components/login/login.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, router_1.Router, user_service_1.UserService, helpers_service_1.HelpersService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map