System.register(['angular2/core', 'angular2/router', '../../services/user.service', '../../services/api.service', '../../models/user', "../../services/helpers.service"], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, api_service_1, user_1, helpers_service_1;
    var RegistrationComponent;
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
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (helpers_service_1_1) {
                helpers_service_1 = helpers_service_1_1;
            }],
        execute: function() {
            RegistrationComponent = (function () {
                function RegistrationComponent(_userService, _apiService, _routeParams, _helpersService) {
                    var _this = this;
                    this._userService = _userService;
                    this._apiService = _apiService;
                    this._routeParams = _routeParams;
                    this._helpersService = _helpersService;
                    this.title = 'Registration';
                    this.user = new user_1.User();
                    this._userService.user$.subscribe(function (updatedUser) { return _this.user = updatedUser; });
                    this.regSuccess = null;
                    this.activating = false;
                    this.regError = {
                        error: false
                    };
                    // Uncomment below for testing
                    //this.user.username = 'chris';
                    //this.user.email = 'chrispratt1985@gmail.com';
                    //this.regPassword = '10Banana12';
                    //this.user.forename = 'Christopher';
                    //this.user.surname = 'Pratt';
                }
                RegistrationComponent.prototype.ngOnInit = function () {
                    if (this._routeParams.get('id')) {
                        var id = +this._routeParams.get('id');
                        this.activating = true;
                        this.activate(id);
                    }
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
                    //noinspection TypeScriptUnresolvedVariable
                    this._apiService.post('register', data).subscribe(function (data) { return _this.regSuccess = data.success.message; }, function (error) { return _this.regError = _this._helpersService.processErrors(error); }, function () {
                        _this.regError.error = false;
                    });
                };
                RegistrationComponent.prototype.activate = function (id) {
                    var _this = this;
                    var data = { id: id };
                    this._apiService.post('activate', data).subscribe(function (data) { return null; }, function (error) { return _this.regError = _this._helpersService.processErrors(error); });
                };
                RegistrationComponent = __decorate([
                    core_1.Component({
                        selector: 'my-registration',
                        templateUrl: 'app/components/registration/registration.component.html',
                        styleUrls: ['app/components/registration/registration.component.css']
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, api_service_1.ApiService, router_1.RouteParams, helpers_service_1.HelpersService])
                ], RegistrationComponent);
                return RegistrationComponent;
            }());
            exports_1("RegistrationComponent", RegistrationComponent);
        }
    }
});
//# sourceMappingURL=registration.component.js.map