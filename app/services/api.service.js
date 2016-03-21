System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'angular2-jwt', 'angular2/router', '../common/headers'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, angular2_jwt_1, router_1, headers_1;
    var ApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            }],
        execute: function() {
            ApiService = (function () {
                function ApiService(http, _authHttp, _router) {
                    this.http = http;
                    this._authHttp = _authHttp;
                    this._router = _router;
                    this._liveURL = 'https://api.imbalancegaming.com/';
                    this._devUrl = 'https://192.168.0.2/imbalance/api/public/index.php/api/';
                    this._devMode = true;
                    ApiService.router = this._router;
                    if (this._devMode) {
                        this._connectionUrl = this._devUrl;
                    }
                    else {
                        this._connectionUrl = this._liveURL;
                    }
                }
                ApiService.prototype.get = function (action) {
                    return this.http.get(this._connectionUrl + action)
                        .map(function (res) { return res.json(); })
                        .catch(ApiService.handleError);
                };
                ApiService.prototype.post = function (action, data) {
                    var body = JSON.stringify(data);
                    return this.http.post(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
                        .map(function (res) { return res.json(); })
                        .catch(ApiService.handleError);
                };
                ApiService.prototype.getWithAuth = function (action) {
                    return this._authHttp.get(this._connectionUrl + action, {
                        headers: headers_1.contentHeaders
                    })
                        .map(function (res) { return ApiService.refreshToken(res); })
                        .catch(ApiService.handleAuthError);
                };
                ApiService.prototype.postWithAuth = function (action, data) {
                    var body = JSON.stringify(data);
                    return this._authHttp.post(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
                        .map(function (res) { return ApiService.refreshToken(res); })
                        .catch(ApiService.handleAuthError);
                };
                ApiService.prototype.patch = function (action, data) {
                    var body = JSON.stringify(data);
                    return this._authHttp.patch(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
                        .map(function (res) { return ApiService.refreshToken(res); })
                        .catch(ApiService.handleAuthError);
                };
                ApiService.handleError = function (error) {
                    //console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ApiService.handleAuthError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    //console.error(error);
                    var errorMessage = error.json().error;
                    switch (errorMessage) {
                        case 'token_invalid':
                            localStorage.removeItem('jwt');
                            ApiService.router.navigate(['Login']);
                            break;
                        case 'token_expired':
                            localStorage.removeItem('jwt');
                            ApiService.router.navigate(['Login']);
                            break;
                        default:
                            ApiService.refreshToken(error);
                            break;
                    }
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ApiService.refreshToken = function (response) {
                    var newToken = response.headers.get('Authorization');
                    if (newToken != null) {
                        newToken = newToken.split(' ').pop();
                        localStorage.setItem('jwt', newToken);
                    }
                    return response.json();
                };
                ApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, router_1.Router])
                ], ApiService);
                return ApiService;
            }());
            exports_1("ApiService", ApiService);
        }
    }
});
//# sourceMappingURL=api.service.js.map