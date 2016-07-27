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
var router_1 = require('@angular/router');
var form_data_service_1 = require("../../../services/form-data.service");
var messages_directive_1 = require("../../../directives/messages/messages.directive");
var project_1 = require("../../../models/project");
var project_service_1 = require("../../../services/project.service");
var user_service_1 = require("../../../services/user.service");
var dynamic_modal_form_directive_1 = require("../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive");
var project_package_1 = require("../../../models/project-package");
var project_package_service_1 = require("../../../services/project-package.service");
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(_projectService, _route, _router, _formDataService, _userService, _packageService) {
        this._projectService = _projectService;
        this._route = _route;
        this._router = _router;
        this._formDataService = _formDataService;
        this._userService = _userService;
        this._packageService = _packageService;
        this.projects = [];
        this.editProjectFormData = [];
        this.addPackageFormData = [];
        this.editPackageFormData = [];
        this.formButtonData = [];
        this.title = 'Project Detail';
        this.project = new project_1.Project();
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._projectService.projects$.subscribe(function (projects) { return _this.projects = projects; });
        this._userService.user$.subscribe(function (user) { return _this._loggedInUser = user; });
        this._userService.updateUserObserver();
        this.getProjectData();
    };
    ProjectDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
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
        this._router.navigate(['/projects/allProjects']);
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
        this._router.navigate(['/projects/packageDetail/' + id, { packageId: this.project.id }]);
    };
    ProjectDetailComponent.prototype.deletePackage = function (id) {
        var _this = this;
        this._packageService.delete(new project_package_1.ProjectPackage(id)).then(function () { return _this.getProjectData(); });
    };
    ProjectDetailComponent.prototype.deploy = function (projectId, serverId) {
        var _this = this;
        this._projectService.deploy(projectId, serverId, this._loggedInUser.id).then(function () { return _this.getProjectData(); });
    };
    ProjectDetailComponent.prototype.getProjectData = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            var page = +params['page'];
            _this._projectService.getProjects(page, true).then(function () {
                _this._projectService.get(id).then(function (project) {
                    _this.project = project;
                    _this._formDataService.getProjectDetailData(project)
                        .then(function (formData) { return _this.editProjectFormData = formData; });
                    _this._formDataService.getPackageCreateData()
                        .then(function (formData) { return _this.addPackageFormData = formData; });
                    _this._formDataService.getDefaultButtons()
                        .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                });
            });
        });
    };
    ProjectDetailComponent = __decorate([
        core_1.Component({
            selector: 'group-detail',
            templateUrl: 'app/components/projects/projectDetail/project-detail.component.html',
            styleUrls: ['app/components/projects/projectDetail/project-detail.component.css'],
            directives: [dynamic_modal_form_directive_1.DynamicModalFormDirective, messages_directive_1.MessagesDirective, router_1.ROUTER_DIRECTIVES, messages_directive_1.MessagesDirective]
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.ActivatedRoute, router_1.Router, form_data_service_1.FormDataService, user_service_1.UserService, project_package_service_1.ProjectPackageService])
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project-detail.component.js.map