System.register(['./app-injector', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_injector_1, router_1;
    var authCheck;
    return {
        setters:[
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            exports_1("authCheck", authCheck = function (next, previous) {
                var injector = app_injector_1.appInjector(); // get the stored reference to the injector
                var router = injector.get(router_1.Router);
                // return a boolean or a promise that resolves a boolean
                return new Promise(function (resolve) {
                    if (localStorage.getItem('jwt')) {
                        resolve(true);
                    }
                    else {
                        router.navigate(['/Login']);
                        resolve(false);
                    }
                });
            });
        }
    }
});
//# sourceMappingURL=auth-check.js.map