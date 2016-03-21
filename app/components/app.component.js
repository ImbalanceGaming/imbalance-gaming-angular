System.register(['angular2/core', 'angular2/router', '../services/api.service', '../services/user.service', '../services/nav.service', '../services/module.service', "../services/helpers.service", './dashboard/dashboard.component', './login/login.component', './navigation/nav.component', './userManagement/user.management.component', "./registration/registration.component"], function(exports_1, context_1) {
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
    var core_1, router_1, api_service_1, user_service_1, nav_service_1, module_service_1, helpers_service_1, dashboard_component_1, login_component_1, nav_component_1, user_management_component_1, registration_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (nav_service_1_1) {
                nav_service_1 = nav_service_1_1;
            },
            function (module_service_1_1) {
                module_service_1 = module_service_1_1;
            },
            function (helpers_service_1_1) {
                helpers_service_1 = helpers_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (nav_component_1_1) {
                nav_component_1 = nav_component_1_1;
            },
            function (user_management_component_1_1) {
                user_management_component_1 = user_management_component_1_1;
            },
            function (registration_component_1_1) {
                registration_component_1 = registration_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_navService, _apiService, _userService, _moduleService) {
                    this._navService = _navService;
                    this._apiService = _apiService;
                    this._userService = _userService;
                    this._moduleService = _moduleService;
                    this.appRoutes = this.getAppRoutes();
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.user$.subscribe(function (user) { return _this.user = user; });
                    this.getModules();
                };
                // Load information for modules
                AppComponent.prototype.getModules = function () {
                    var _this = this;
                    this._apiService.get('modules')
                        .subscribe(function (data) { return _this._moduleService.createModules(data.data); }, function (error) { return console.log(error); });
                };
                // Needs further work to get the component part of the route converted from a string to a type
                AppComponent.prototype.buildMainMenus = function () {
                    this._moduleService.modules.forEach(function (module) {
                        module.menus.forEach(function (menu) {
                            if (menu.link) {
                                var route = { path: menu.link, component: window[menu.component], as: menu.name };
                                console.log(route);
                                this._navService.addRoute(this.constructor, route);
                                this.appRoutes = this.getAppRoutes();
                            }
                        }, this);
                    }, this);
                };
                // Get routes currently set in the nav service
                AppComponent.prototype.getAppRoutes = function () {
                    return this._navService.getRoutes(this.constructor).configs.map(function (route) {
                        return { path: [("/" + route.path)], name: route.as };
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'IGMS',
                        viewProviders: [nav_service_1.NavService],
                        templateUrl: 'app/components/app.component.html',
                        encapsulation: core_1.ViewEncapsulation.None,
                        directives: [
                            nav_component_1.NavComponent,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            api_service_1.ApiService,
                            user_service_1.UserService,
                            module_service_1.ModuleService,
                            helpers_service_1.HelpersService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            as: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/login',
                            as: 'Login',
                            component: login_component_1.LoginComponent
                        },
                        {
                            path: '/signup',
                            as: 'Signup',
                            component: registration_component_1.RegistrationComponent
                        },
                        {
                            path: '/activate/:id',
                            as: 'Activate',
                            component: registration_component_1.RegistrationComponent
                        },
                        {
                            path: '/usermanagement/...',
                            as: 'UserManagement',
                            component: user_management_component_1.UserManagementComponent
                        },
                    ]), 
                    __metadata('design:paramtypes', [nav_service_1.NavService, api_service_1.ApiService, user_service_1.UserService, module_service_1.ModuleService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map