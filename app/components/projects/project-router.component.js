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
var user_service_1 = require('../../services/user.service');
var dynamic_modal_form_directive_1 = require("../../directives/dynamic-form/modalForm/dynamic-modal-form.directive");
var form_data_service_1 = require("../../services/form-data.service");
var project_1 = require("../../models/project");
var project_service_1 = require("../../services/project.service");
var project_package_service_1 = require("../../services/project-package.service");
var ProjectRouterComponent = (function () {
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
        this._formDataService.getProjectCreateData()
            .then(function (formData) { return _this.formData = formData; });
    };
    ProjectRouterComponent.prototype.onSubmit = function (formData) {
        this.project.key = formData.key;
        this.project.name = formData.name;
        this.project.description = formData.description;
        this.project.url = formData.url;
        this.project.lead_user = null;
        //noinspection TypeScriptUnresolvedVariable
        this.project.lead_user_id = formData.selectedSearchValue;
        this._projectService.add(this.project);
        this.project = new project_1.Project();
        this._router.navigate(['/projects']);
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
            directives: [router_1.RouterOutlet, router_1.ROUTER_DIRECTIVES, dynamic_modal_form_directive_1.DynamicModalFormDirective],
            providers: [project_package_service_1.ProjectPackageService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, form_data_service_1.FormDataService, project_service_1.ProjectService, router_1.Router])
    ], ProjectRouterComponent);
    return ProjectRouterComponent;
}());
exports.ProjectRouterComponent = ProjectRouterComponent;
//# sourceMappingURL=project-router.component.js.map