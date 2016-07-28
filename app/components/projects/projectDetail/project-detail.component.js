System.register(['angular2/core', 'angular2/router', "../../../services/form-data.service", "../../../directives/messages/messages.directive", "../../../models/project", "../../../services/project.service", "../../../services/user.service", "../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive", "../../../models/project-package", "../../../services/project-package.service"], function(exports_1, context_1) {
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
    var core_1, router_1, form_data_service_1, messages_directive_1, project_1, project_service_1, user_service_1, dynamic_modal_form_directive_1, project_package_1, project_package_service_1;
    var ProjectDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            },
            function (dynamic_modal_form_directive_1_1) {
                dynamic_modal_form_directive_1 = dynamic_modal_form_directive_1_1;
            },
            function (project_package_1_1) {
                project_package_1 = project_package_1_1;
            },
            function (project_package_service_1_1) {
                project_package_service_1 = project_package_service_1_1;
            }],
        execute: function() {
            ProjectDetailComponent = (function () {
                function ProjectDetailComponent(_projectService, _routeParams, _router, _formDataService, _userService, _packageService) {
                    this._projectService = _projectService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._formDataService = _formDataService;
                    this._userService = _userService;
                    this._packageService = _packageService;
                    this.projects = [];
                    this.project = new project_1.Project();
                    this.editProjectFormData = [];
                    this.addPackageFormData = [];
                    this.editPackageFormData = [];
                    this.formButtonData = [];
                    this._deploymentTabActive = false;
                    this.title = 'Project Detail';
                    this.project = new project_1.Project();
                }
                ProjectDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._projectService.projects$.subscribe(function (projects) { return _this.projects = projects; });
                    this._projectService.project$.subscribe(function (project) { return _this.project = project; });
                    this._userService.user$.subscribe(function (user) { return _this._loggedInUser = user; });
                    this._userService.updateUserObserver();
                    var id = +this._routeParams.get('id');
                    var page = +this._routeParams.get('page');
                    this.getProjectData();
                };
                ProjectDetailComponent.prototype.ngOnDestroy = function () {
                    this._pollObserver.unsubscribe();
                };
                ProjectDetailComponent.prototype.saveProjectChanges = function (formData) {
                    var _this = this;
                    this.project.description = formData.description;
                    this.project.url = formData.url;
                    //noinspection TypeScriptUnresolvedVariable
                    this.project.lead_user_id = formData.selectedSearchValue;
                    this._projectService.update(this.project).then(function () { return _this.getProjectData(); });
                };
                ProjectDetailComponent.prototype.deleteProject = function () {
                    this._projectService.delete(this.project);
                    this._router.navigate(['/Projects', 'AllProjects']);
                };
                ProjectDetailComponent.prototype.onSearch = function (searchValue) {
                    var _this = this;
                    this._userService.findUsers(searchValue)
                        .then(function (data) { return _this.searchReturn = data; });
                };
                ProjectDetailComponent.prototype.createPackage = function (formData) {
                    var _this = this;
                    var newPackage = this._packageService.create({
                        name: formData.name,
                        repository: formData.repository,
                        deploy_branch: formData.deploy_branch,
                        deploy_location: formData.deploy_location
                    });
                    newPackage.project = this.project;
                    this._packageService.add(newPackage).then(function () { return _this.getProjectData(); });
                };
                ProjectDetailComponent.prototype.editPackage = function (id) {
                    this._router.navigate(['../PackageDetail', { id: id, packageId: this.project.id }]);
                };
                ProjectDetailComponent.prototype.deletePackage = function (id) {
                    var _this = this;
                    this._packageService.delete(new project_package_1.ProjectPackage(id)).then(function () { return _this.getProjectData(); });
                };
                ProjectDetailComponent.prototype.deploy = function (projectId, serverId) {
                    var _this = this;
                    this._projectService.deploy(projectId, serverId, this._loggedInUser.id)
                        .then(function () {
                        _this.getProjectData();
                        _this.deploymentTab.nativeElement.classesToAdd = 'active';
                        _this.serverTab.nativeElement.classesToRemove = 'active';
                    });
                };
                ProjectDetailComponent.prototype.getProjectData = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    var page = +this._routeParams.get('page');
                    return this._projectService.getProjects(page, true).then(function () {
                        _this._projectService.get(id).then(function (project) {
                            _this._projectService.set(project);
                            _this._formDataService.getProjectDetailData(project)
                                .then(function (formData) { return _this.editProjectFormData = formData; });
                            _this._formDataService.getPackageCreateData()
                                .then(function (formData) { return _this.addPackageFormData = formData; });
                            _this._formDataService.getDefaultButtons()
                                .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                            _this._pollObserver = _this._projectService.pollProject(id, page);
                        });
                    });
                };
                __decorate([
                    core_1.ViewChild('deploymentTab'), 
                    __metadata('design:type', core_1.ElementRef)
                ], ProjectDetailComponent.prototype, "deploymentTab", void 0);
                __decorate([
                    core_1.ViewChild('serverTab'), 
                    __metadata('design:type', core_1.ElementRef)
                ], ProjectDetailComponent.prototype, "serverTab", void 0);
                ProjectDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'group-detail',
                        templateUrl: 'app/components/projects/projectDetail/project-detail.component.html',
                        styleUrls: ['app/components/projects/projectDetail/project-detail.component.css'],
                        directives: [dynamic_modal_form_directive_1.DynamicModalFormDirective, messages_directive_1.MessagesDirective, router_1.ROUTER_DIRECTIVES, messages_directive_1.MessagesDirective]
                    }), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.RouteParams, router_1.Router, form_data_service_1.FormDataService, user_service_1.UserService, project_package_service_1.ProjectPackageService])
                ], ProjectDetailComponent);
                return ProjectDetailComponent;
            }());
            exports_1("ProjectDetailComponent", ProjectDetailComponent);
        }
    }
});
//# sourceMappingURL=project-detail.component.js.map