System.register(['angular2/core', 'angular2/router', "../../common/auth-check", '../../services/user.service', "./projects.component", "./projectDetail/project-detail.component", "../../directives/dynamic-form/modalForm/dynamic-modal-form.directive", "../../services/form-data.service", "../../models/project", "../../services/project.service"], function(exports_1, context_1) {
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
    var core_1, router_1, auth_check_1, user_service_1, projects_component_1, project_detail_component_1, dynamic_modal_form_directive_1, form_data_service_1, project_1, project_service_1;
    var ProjectRouterComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (projects_component_1_1) {
                projects_component_1 = projects_component_1_1;
            },
            function (project_detail_component_1_1) {
                project_detail_component_1 = project_detail_component_1_1;
            },
            function (dynamic_modal_form_directive_1_1) {
                dynamic_modal_form_directive_1 = dynamic_modal_form_directive_1_1;
            },
            function (form_data_service_1_1) {
                form_data_service_1 = form_data_service_1_1;
            },
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            }],
        execute: function() {
            ProjectRouterComponent = (function () {
                function ProjectRouterComponent(_userService, _formDataService, _projectService, _router) {
                    this._userService = _userService;
                    this._formDataService = _formDataService;
                    this._projectService = _projectService;
                    this._router = _router;
                    this.title = 'Projects';
                    this.formData = [];
                    this.project = new project_1.Project();
                }
                ProjectRouterComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.user$.subscribe(function (updatedUser) { return _this._user = updatedUser; });
                    this._userService.loggedInCheck();
                    this._formDataService.getProjectCreateData()
                        .then(function (formData) { return _this.formData = formData; });
                };
                ProjectRouterComponent.prototype.onSubmit = function (formData) {
                    this.project.key = formData.key;
                    this.project.name = formData.name;
                    this.project.description = formData.description;
                    this.project.url = formData.url;
                    this.project.git_url = formData.git_url;
                    this.project.status = formData.status;
                    this.project.lead_user = null;
                    //noinspection TypeScriptUnresolvedVariable
                    this.project.lead_user_id = formData.selectedSearchValue;
                    this._projectService.add(this.project);
                    this.project = new project_1.Project();
                    this._router.navigate(['Projects']);
                };
                ProjectRouterComponent.prototype.onSearch = function (searchValue) {
                    var _this = this;
                    this._userService.findUsers(searchValue)
                        .then(function (data) { return _this.searchReturn = data; });
                };
                ProjectRouterComponent = __decorate([
                    core_1.Component({
                        selector: 'user-management',
                        templateUrl: 'app/components/projects/project-router.component.html',
                        styleUrls: ['app/components/projects/project-router.component.css'],
                        directives: [router_1.RouterOutlet, router_1.ROUTER_DIRECTIVES, dynamic_modal_form_directive_1.DynamicModalFormDirective]
                    }),
                    router_1.RouteConfig([
                        { path: '/allProjects', name: 'AllProjects', component: projects_component_1.ProjectsComponent, useAsDefault: true },
                        { path: '/projectDetail/:id', name: 'ProjectDetail', component: project_detail_component_1.ProjectDetailComponent }
                    ]),
                    router_1.CanActivate(function (next, previous) {
                        return auth_check_1.authCheck(next, previous);
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, form_data_service_1.FormDataService, project_service_1.ProjectService, router_1.Router])
                ], ProjectRouterComponent);
                return ProjectRouterComponent;
            }());
            exports_1("ProjectRouterComponent", ProjectRouterComponent);
        }
    }
});
//# sourceMappingURL=project-router.component.js.map