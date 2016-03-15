System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
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
            }],
        execute: function() {
            ApiService = (function () {
                function ApiService(http) {
                    this.http = http;
                    this._liveURL = 'http://192.168.0.2/imbalance/api/';
                    this._devUrl = 'http://192.168.0.2/imbalance/api/public/index.php/api/';
                    this._devMode = true;
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
                        .do(function (data) { return console.log(data); }) // eyeball results in the console
                        .catch(this.handleError);
                };
                ApiService.prototype.authenticate = function (data) {
                    var creds = "email=" + data.email + "&password=" + data.password;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //noinspection TypeScriptUnresolvedVariable
                    return this.http.post(this._connectionUrl + 'login', creds, {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ApiService.prototype.getAuthenticatedUser = function () {
                    var key = "token=" + localStorage.getItem('id_token');
                    var headers = new http_1.Headers();
                    //headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    //noinspection TypeScriptUnresolvedVariable
                    return this.http.post(this._connectionUrl + 'loginUser', key, {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                ApiService.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    //console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                ApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ApiService);
                return ApiService;
            }());
            exports_1("ApiService", ApiService);
        }
    }
});
//# sourceMappingURL=api.service.js.map