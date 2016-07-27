"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var angular2_jwt_1 = require('angular2-jwt');
var router_1 = require('@angular/router');
var headers_1 = require('../common/headers');
var config_1 = require('../config/config');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/operator/delay');
require('rxjs/operator/mergeMap');
require('rxjs/operator/switchMap');
var ApiService = (function () {
    function ApiService(http, _authHttp, _router) {
        this.http = http;
        this._authHttp = _authHttp;
        this._router = _router;
        this._liveURL = config_1.Config.properties.liveAPIUrl;
        this._devUrl = config_1.Config.properties.devAPIUrl;
        this._devMode = config_1.Config.properties.devMode;
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
    ApiService.prototype.getWithAuth = function (action) {
        return this._authHttp.get(this._connectionUrl + action, {
            headers: headers_1.contentHeaders
        })
            .map(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.getPromiseWithAuth = function (action) {
        return this._authHttp.get(this._connectionUrl + action, {
            headers: headers_1.contentHeaders
        })
            .toPromise()
            .then(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.post = function (action, data) {
        var body = JSON.stringify(data);
        return this.http.post(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
            .map(function (res) { return res.json(); })
            .catch(ApiService.handleError);
    };
    ApiService.prototype.postPromise = function (action, data) {
        var body = JSON.stringify(data);
        return this.http.post(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(ApiService.handleError);
    };
    ApiService.prototype.postWithAuth = function (action, data) {
        var body = JSON.stringify(data);
        return this._authHttp.post(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
            .map(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.postPromiseWithAuth = function (action, data) {
        var body = JSON.stringify(data);
        return this._authHttp.post(this._connectionUrl + action, body, {
            headers: headers_1.contentHeaders
        })
            .toPromise()
            .then(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.patch = function (action, data) {
        var body = JSON.stringify(data);
        return this._authHttp.patch(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
            .map(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.patchPromise = function (action, data) {
        var body = JSON.stringify(data);
        return this._authHttp.patch(this._connectionUrl + action, body, { headers: headers_1.contentHeaders })
            .toPromise()
            .then(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.delete = function (action) {
        return this._authHttp.delete(this._connectionUrl + action, { headers: headers_1.contentHeaders })
            .map(function (res) { return ApiService.refreshToken(res); })
            .catch(ApiService.handleAuthError);
    };
    ApiService.prototype.deletePromise = function (action) {
        return this._authHttp.delete(this._connectionUrl + action, { headers: headers_1.contentHeaders })
            .toPromise()
            .then(function (res) { return ApiService.refreshToken(res); })
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
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map