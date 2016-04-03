System.register(['angular2/core', 'angular2/router', "../../../../common/auth-check", "../../../../directives/dynamic-form/normalForm/dynamic-form.directive", "../../../../services/form-data.service", "../../../../directives/messages/messages.directive", "../../../../models/group", "../../../../services/group.service", "../../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive", "../../../../services/user.service", "../../../../services/project.service"], function(exports_1, context_1) {
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
    var core_1, router_1, auth_check_1, dynamic_form_directive_1, form_data_service_1, messages_directive_1, group_1, group_service_1, dynamic_modal_form_directive_1, user_service_1, project_service_1;
    var GroupDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_check_1_1) {
                auth_check_1 = auth_check_1_1;
            },
            function (dynamic_form_directive_1_1) {
                dynamic_form_directive_1 = dynamic_form_directive_1_1;
            },
            function (form_data_service_1_1) {
                form_data_service_1 = form_data_service_1_1;
            },
            function (messages_directive_1_1) {
                messages_directive_1 = messages_directive_1_1;
            },
            function (group_1_1) {
                group_1 = group_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (dynamic_modal_form_directive_1_1) {
                dynamic_modal_form_directive_1 = dynamic_modal_form_directive_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            }],
        execute: function() {
            GroupDetailComponent = (function () {
                function GroupDetailComponent(_groupService, _routeParams, _router, _formDataService, _userService, _projectService) {
                    var _this = this;
                    this._groupService = _groupService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._formDataService = _formDataService;
                    this._userService = _userService;
                    this._projectService = _projectService;
                    this.groups = [];
                    this.formData = [];
                    this.formButtonData = [];
                    this.userModalFormData = [];
                    this.userSearchReturn = [];
                    this.projectModalFormData = [];
                    this.projectSearchReturn = [];
                    this.title = 'Group Detail';
                    this.group = new group_1.Group();
                    this._formDataService.getGroupAddUserData()
                        .then(function (formData) { return _this.userModalFormData = formData; });
                    this._formDataService.getGroupAddProjectData()
                        .then(function (formData) { return _this.projectModalFormData = formData; });
                }
                GroupDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._groupService.groups$.subscribe(function (groups) { return _this.groups = groups; });
                    this.updateForm();
                };
                GroupDetailComponent.prototype.saveChanges = function (formData) {
                    this.group.name = formData.name;
                    this.group.description = formData.description;
                    this._groupService.update(this.group);
                };
                GroupDetailComponent.prototype.cancelEdit = function () {
                    this._router.navigate(['Groups']);
                };
                GroupDetailComponent.prototype.deleteUser = function () {
                    this._groupService.delete(this.group);
                    this._router.navigate(['Groups']);
                };
                GroupDetailComponent.prototype.onAddUser = function (formData) {
                    var _this = this;
                    //noinspection TypeScriptUnresolvedVariable
                    this._groupService.addUserToGroup(this.group.id, formData.selectedSearchValue)
                        .then(function () {
                        _this.updateForm();
                    });
                };
                GroupDetailComponent.prototype.onUserSearch = function (searchValue) {
                    var _this = this;
                    this._userService.findUsers(searchValue)
                        .then(function (data) { return _this.userSearchReturn = data; });
                };
                GroupDetailComponent.prototype.onRemoveUser = function (userId) {
                    var _this = this;
                    this._groupService.removeUserFromGroup(this.group.id, userId)
                        .then(function () {
                        _this.updateForm();
                    });
                };
                GroupDetailComponent.prototype.onAddProject = function (formData) {
                    var _this = this;
                    //noinspection TypeScriptUnresolvedVariable
                    this._groupService.addProjectToGroup(this.group.id, formData.selectedSearchValue)
                        .then(function () {
                        _this.updateForm();
                    });
                };
                GroupDetailComponent.prototype.onProjectSearch = function (searchValue) {
                    var _this = this;
                    this._projectService.findProjects(searchValue)
                        .then(function (data) { return _this.projectSearchReturn = data; });
                };
                GroupDetailComponent.prototype.onRemoveProject = function (projectId) {
                    var _this = this;
                    this._groupService.removeProjectFromGroup(this.group.id, projectId)
                        .then(function () {
                        _this.updateForm();
                    });
                };
                GroupDetailComponent.prototype.updateForm = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    var page = +this._routeParams.get('page');
                    this._groupService.getGroups(page, true).then(function () {
                        _this._groupService.get(id).then(function (group) {
                            _this.group = group;
                            _this._formDataService.getGroupDetailData(group)
                                .then(function (formData) { return _this.formData = formData; });
                            _this._formDataService.getDefaultButtons()
                                .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                        });
                    });
                };
                GroupDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'group-detail',
                        templateUrl: 'app/components/userManagement/groups/groupDetail/group-detail.component.html',
                        styleUrls: ['app/components/userManagement/groups/groupDetail/group-detail.component.css'],
                        directives: [dynamic_form_directive_1.DynamicFormDirective, messages_directive_1.MessagesDirective, router_1.ROUTER_DIRECTIVES, dynamic_modal_form_directive_1.DynamicModalFormDirective]
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return auth_check_1.authCheck(next, previous);
                    }), 
                    __metadata('design:paramtypes', [group_service_1.GroupService, router_1.RouteParams, router_1.Router, form_data_service_1.FormDataService, user_service_1.UserService, project_service_1.ProjectService])
                ], GroupDetailComponent);
                return GroupDetailComponent;
            }());
            exports_1("GroupDetailComponent", GroupDetailComponent);
        }
    }
});
//# sourceMappingURL=group-detail.component.js.map