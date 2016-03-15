System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/operator/share', "services/api.service"], function(exports_1, context_1) {
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
    var core_1, Observable_1, api_service_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(_apiService) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._user = {
                        id: 0,
                        username: '',
                        fullName: '',
                        email: ''
                    };
                    this._error = null;
                    this.user$ = new Observable_1.Observable(function (observer) { return _this._userObserver = observer; }).share();
                }
                Object.defineProperty(UserService.prototype, "user", {
                    get: function () {
                        return this._user;
                    },
                    set: function (value) {
                        this._user = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UserService.prototype, "error", {
                    get: function () {
                        return this._error;
                    },
                    set: function (value) {
                        this._error = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                UserService.prototype.setBasicUserDetails = function (userData) {
                    this.user.email = userData.email;
                    this.user.id = userData.id;
                    this.user.username = userData.username;
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof api_service_1.ApiService !== 'undefined' && api_service_1.ApiService) === 'function' && _a) || Object])
                ], UserService);
                return UserService;
                var _a;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map