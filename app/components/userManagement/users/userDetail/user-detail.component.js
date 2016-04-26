System.register(['angular2/core', 'angular2/router', "../../../../models/user", "../../../../services/user.service", "../../../../directives/dynamic-form/normalForm/dynamic-form.directive", "../../../../services/form-data.service", "../../../../directives/messages/messages.directive"], function(exports_1, context_1) {
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
    var core_1, router_1, user_1, user_service_1, dynamic_form_directive_1, form_data_service_1, messages_directive_1;
    var UserDetail;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (dynamic_form_directive_1_1) {
                dynamic_form_directive_1 = dynamic_form_directive_1_1;
            },
            function (form_data_service_1_1) {
                form_data_service_1 = form_data_service_1_1;
            },
            function (messages_directive_1_1) {
                messages_directive_1 = messages_directive_1_1;
            }],
        execute: function() {
            UserDetail = (function () {
                function UserDetail(_userService, _routeParams, _router, _formDataService) {
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._formDataService = _formDataService;
                    this.users = [];
                    this.formData = [];
                    this.formButtonData = [];
                    this.title = 'User Detail';
                    this.user = new user_1.User();
                }
                UserDetail.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.users$.subscribe(function (updatedUser) { return _this.users = updatedUser; });
                    var id = +this._routeParams.get('id');
                    var page = +this._routeParams.get('page');
                    this._userService.getUsers(page, true).then(function () {
                        _this._userService.get(id).then(function (user) {
                            _this.user = user;
                            _this._formDataService.getUserDetailData(user)
                                .then(function (formData) { return _this.formData = formData; });
                            _this._formDataService.getDefaultButtons()
                                .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                        });
                    });
                };
                UserDetail.prototype.saveChanges = function (formData) {
                    this.user.username = formData.username;
                    this.user.email = formData.email;
                    this.user.forename = formData.forename;
                    this.user.surname = formData.surname;
                    this.user.role = formData.role;
                    this.user.has_dev_area = formData.has_dev_area;
                    this._userService.update(this.user);
                };
                UserDetail.prototype.cancelEdit = function () {
                    this._router.navigate(['Users']);
                };
                UserDetail.prototype.deleteUser = function () {
                    this._userService.delete(this.user);
                    this._router.navigate(['Users']);
                };
                UserDetail = __decorate([
                    core_1.Component({
                        selector: 'user-detail',
                        templateUrl: 'app/components/userManagement/users/userDetail/user-detail.component.html',
                        styleUrls: ['app/components/userManagement/users/userDetail/user-detail.component.css'],
                        directives: [dynamic_form_directive_1.DynamicFormDirective, messages_directive_1.MessagesDirective]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.RouteParams, router_1.Router, form_data_service_1.FormDataService])
                ], UserDetail);
                return UserDetail;
            }());
            exports_1("UserDetail", UserDetail);
        }
    }
});
//# sourceMappingURL=user-detail.component.js.map