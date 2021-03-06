System.register(['angular2/core', 'angular2/router', "../components/app.component"], function(exports_1, context_1) {
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
    var core_1, router_1, app_component_1;
    var NavService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            NavService = (function () {
                function NavService(registry) {
                    this.registry = registry;
                }
                // Gets the list of registered with @RouteConfig routes
                // associated with given `component`
                NavService.prototype.getRoutes = function (component) {
                    return Reflect.getMetadata('annotations', component)
                        .filter(function (a) {
                        return a.constructor.name === 'RouteConfig';
                    }).pop();
                };
                // Updates the metadata added by @RouteConfig associated
                // with given `component`
                NavService.prototype.updateRouteConfig = function (component, routeConfig) {
                    var annotations = Reflect.getMetadata('annotations', component);
                    var routeConfigIndex = -1;
                    for (var i = 0; i < annotations.length; i += 1) {
                        if (annotations[i].constructor.name === 'RouteConfig') {
                            routeConfigIndex = i;
                            break;
                        }
                    }
                    if (routeConfigIndex < 0) {
                        throw new Error('No route metadata attached to the component');
                    }
                    annotations[routeConfigIndex] = routeConfig;
                    Reflect.defineMetadata('annotations', annotations, app_component_1.AppComponent);
                };
                // Adds additional `route` to given `component`
                NavService.prototype.addRoute = function (component, route) {
                    var routeConfig = this.getRoutes(component);
                    routeConfig.configs.push(route);
                    this.updateRouteConfig(component, routeConfig);
                    this.registry.config(component, route);
                };
                NavService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.RouteRegistry])
                ], NavService);
                return NavService;
            }());
            exports_1("NavService", NavService);
        }
    }
});
//# sourceMappingURL=nav.service.js.map