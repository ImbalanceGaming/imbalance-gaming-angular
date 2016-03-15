System.register(['angular2/core', 'angular2/router', 'angular2/http', "services/api.service", 'services/user.service', './dashboard/dashboard.component', "./login/login.component"], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, api_service_1, user_service_1, dashboard_component_1, login_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_apiService, _router, _userService) {
                    this._apiService = _apiService;
                    this._router = _router;
                    this._userService = _userService;
                    this.title = 'IGMS';
                    this.userKey = localStorage.getItem('id_token');
                    this.loggedIn = false;
                }
                AppComponent.prototype.ngOnInit = function () {
                    //this._userService.user$.subscribe(user => this.user = user);
                    this.loggedInCheck();
                };
                AppComponent.prototype.loggedInCheck = function () {
                    var _this = this;
                    if (this.userKey == 'undefined' || this.userKey == null) {
                        this._router.navigate(['Login']);
                    }
                    else {
                        this._apiService.getAuthenticatedUser()
                            .subscribe(function (data) { return _this._userService.setBasicUserDetails(data); }, function (error) { return _this._router.navigate(['Login']); }, function () {
                            _this._router.navigate(['Dashboard']);
                            _this.loggedIn = true;
                        });
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'IGMS',
                        templateUrl: 'app/components/app.component.html',
                        styleUrls: ['app/components/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS,
                            api_service_1.ApiService,
                            user_service_1.UserService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof api_service_1.ApiService !== 'undefined' && api_service_1.ApiService) === 'function' && _a) || Object, router_1.Router, (typeof (_b = typeof user_service_1.UserService !== 'undefined' && user_service_1.UserService) === 'function' && _b) || Object])
                ], AppComponent);
                return AppComponent;
                var _a, _b;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map