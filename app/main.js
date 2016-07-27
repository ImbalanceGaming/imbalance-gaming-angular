"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var forms_1 = require('@angular/forms');
// import 'rxjs/Rx';
var app_component_1 = require('./components/app.component');
var app_routes_1 = require('./components/app.routes');
var auth_guard_service_1 = require("./services/auth-guard.service");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    app_routes_1.appRouterProviders,
    auth_guard_service_1.AuthGuard,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    core_1.provide(angular2_jwt_1.AuthHttp, {
        useFactory: function (http) {
            return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: 'jwt',
                tokenGetter: (function () { return localStorage.getItem('jwt'); }),
                noJwtError: true,
                globalHeaders: [{ 'Content-Type': 'application/json' }]
            }), http);
        },
        deps: [http_1.Http]
    })
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map