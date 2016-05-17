System.register(['angular2/core', 'angular2/router', '../../models/user', "../../services/auth.service", "../../directives/messages/messages.directive"], function(exports_1, context_1) {
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
    var core_1, router_1, user_1, auth_service_1, messages_directive_1;
    var RegistrationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (messages_directive_1_1) {
                messages_directive_1 = messages_directive_1_1;
            }],
        execute: function() {
            RegistrationComponent = (function () {
                function RegistrationComponent(_routeParams, _authService, _router) {
                    this._routeParams = _routeParams;
                    this._authService = _authService;
                    this._router = _router;
                    this.title = 'Registration';
                    this.user = new user_1.User();
                    this.regSuccess = false;
                    this.activating = false;
                    // Uncomment below for testing
                    // this.user.username = 'chris';
                    // this.user.email = 'chrispratt1985@gmail.com';
                    // this.regPassword = '10Banana12';
                    // this.user.forename = 'Christopher';
                    // this.user.surname = 'Pratt';
                }
                RegistrationComponent.prototype.ngOnInit = function () {
                    if (this._routeParams.get('id')) {
                        var id = +this._routeParams.get('id');
                        this.activating = true;
                        this._authService.activate(id);
                    }
                };
                RegistrationComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var data = {
                        username: this.user.username,
                        password: this.regPassword,
                        email: this.user.email,
                        forename: this.user.forename,
                        surname: this.user.surname
                    };
                    this._authService.register(data).then(function (complete) {
                        if (complete) {
                            _this.regSuccess = true;
                        }
                    });
                };
                RegistrationComponent.prototype.onBack = function () {
                    this._router.navigate(['Login']);
                };
                RegistrationComponent = __decorate([
                    core_1.Component({
                        selector: 'my-registration',
                        templateUrl: 'app/components/registration/registration.component.html',
                        styleUrls: ['app/components/registration/registration.component.css'],
                        directives: [messages_directive_1.MessagesDirective]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, auth_service_1.AuthService, router_1.Router])
                ], RegistrationComponent);
                return RegistrationComponent;
            }());
            exports_1("RegistrationComponent", RegistrationComponent);
        }
    }
});
//# sourceMappingURL=registration.component.js.map