System.register(['angular2/core', 'angular2/router', "../../../common/auth-check", "../../../directives/dynamic-form/normalForm/dynamic-form.directive", "../../../services/form-data.service", "../../../directives/messages/messages.directive", "../../../models/project", "../../../services/project.service", "../../../services/user.service"], function(exports_1, context_1) {
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
    var core_1, router_1, auth_check_1, dynamic_form_directive_1, form_data_service_1, messages_directive_1, project_1, project_service_1, user_service_1;
    var ProjectDetailComponent;
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
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            ProjectDetailComponent = (function () {
                function ProjectDetailComponent(_projectService, _routeParams, _router, _formDataService, _userService) {
                    this._projectService = _projectService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._formDataService = _formDataService;
                    this._userService = _userService;
                    this.projects = [];
                    this.formData = [];
                    this.formButtonData = [];
                    this.title = 'Project Detail';
                    this.project = new project_1.Project();
                }
                ProjectDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._projectService.projects$.subscribe(function (projects) { return _this.projects = projects; });
                    var id = +this._routeParams.get('id');
                    var page = +this._routeParams.get('page');
                    this._projectService.getProjects(page, true).then(function () {
                        _this._projectService.get(id).then(function (project) {
                            _this.project = project;
                            _this._formDataService.getProjectDetailData(project)
                                .then(function (formData) { return _this.formData = formData; });
                            _this._formDataService.getDefaultButtons()
                                .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                        });
                    });
                };
                ProjectDetailComponent.prototype.saveChanges = function (formData) {
                    this.project.description = formData.description;
                    this.project.url = formData.url;
                    this.project.git_url = formData.git_url;
                    this.project.status = formData.status;
                    this.project.lead_user = null;
                    //noinspection TypeScriptUnresolvedVariable
                    this.project.lead_user_id = formData.selectedSearchValue;
                    this._projectService.update(this.project);
                    var page = +this._routeParams.get('page');
                    this._projectService.getProjects(page, true, true);
                };
                ProjectDetailComponent.prototype.cancelEdit = function () {
                    this._router.navigate(['/Projects']);
                };
                ProjectDetailComponent.prototype.deleteProject = function () {
                    this._projectService.delete(this.project);
                    this._router.navigate(['/Projects']);
                };
                ProjectDetailComponent.prototype.onSearch = function (searchValue) {
                    var _this = this;
                    this._userService.findUsers(searchValue)
                        .then(function (data) { return _this.searchReturn = data; });
                };
                ProjectDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'group-detail',
                        templateUrl: 'app/components/projects/projectDetail/project-detail.component.html',
                        styleUrls: ['app/components/projects/projectDetail/project-detail.component.css'],
                        directives: [dynamic_form_directive_1.DynamicFormDirective, messages_directive_1.MessagesDirective, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return auth_check_1.authCheck(next, previous);
                    }), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.RouteParams, router_1.Router, form_data_service_1.FormDataService, user_service_1.UserService])
                ], ProjectDetailComponent);
                return ProjectDetailComponent;
            }());
            exports_1("ProjectDetailComponent", ProjectDetailComponent);
        }
    }
});
//# sourceMappingURL=project-detail.component.js.map