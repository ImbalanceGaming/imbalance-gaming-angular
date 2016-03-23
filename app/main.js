System.register(['angular2/platform/browser', 'angular2/core', 'angular2/common', 'angular2/router', 'angular2/http', 'angular2-jwt', 'rxjs/Rx', './components/app.component', './common/app-injector', './config/config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, common_1, router_1, http_1, angular2_jwt_1, app_component_1, app_injector_1, config_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (_1) {},
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                common_1.FORM_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                angular2_jwt_1.AuthHttp,
                core_1.provide(angular2_jwt_1.AuthHttp, {
                    useFactory: function (http) {
                        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
                            headerName: 'Authorization',
                            headerPrefix: 'Bearer',
                            tokenName: 'jwt',
                            tokenGetter: (function () { return localStorage.getItem('jwt'); }),
                            noJwtError: true
                        }), http);
                    },
                    deps: [http_1.Http]
                }),
                core_1.provide('config', {
                    useValue: {
                        key1: 'value',
                        visibleDropdowns: false,
                        nested: {
                            name: config_1.Config.properties.name,
                            description: config_1.Config.properties.description,
                            version: config_1.Config.properties.version,
                            devMode: config_1.Config.properties.devMode,
                            liveAPIUrl: config_1.Config.properties.liveAPIUrl,
                            devAPIUrl: config_1.Config.properties.devAPIUrl
                        }
                    }
                })
            ]).then(function (appRef) {
                // store a reference to the application injector
                app_injector_1.appInjector(appRef.injector);
            });
        }
    }
});
//# sourceMappingURL=main.js.map