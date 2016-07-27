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
var dynamic_form_directive_1 = require("../../../../directives/dynamic-form/normalForm/dynamic-form.directive");
var form_data_service_1 = require("../../../../services/form-data.service");
var messages_directive_1 = require("../../../../directives/messages/messages.directive");
var group_1 = require("../../../../models/group");
var group_service_1 = require("../../../../services/group.service");
var dynamic_modal_form_directive_1 = require("../../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive");
var user_service_1 = require("../../../../services/user.service");
var project_service_1 = require("../../../../services/project.service");
var GroupDetailComponent = (function () {
    function GroupDetailComponent(_groupService, _route, _router, _formDataService, _userService, _projectService) {
        var _this = this;
        this._groupService = _groupService;
        this._route = _route;
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
        this._formDataService.getAddUserData()
            .then(function (formData) { return _this.userModalFormData = formData; });
        this._formDataService.getAddProjectData()
            .then(function (formData) { return _this.projectModalFormData = formData; });
    }
    GroupDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._groupService.groups$.subscribe(function (groups) { return _this.groups = groups; });
        this.updateForm();
    };
    GroupDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
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
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            var page = +params['page'];
            _this._groupService.getGroups(page, true).then(function () {
                _this._groupService.get(id).then(function (group) {
                    _this.group = group;
                    _this._formDataService.getGroupDetailData(group)
                        .then(function (formData) { return _this.formData = formData; });
                    _this._formDataService.getDefaultButtons()
                        .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                });
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
        __metadata('design:paramtypes', [group_service_1.GroupService, router_1.ActivatedRoute, router_1.Router, form_data_service_1.FormDataService, user_service_1.UserService, project_service_1.ProjectService])
    ], GroupDetailComponent);
    return GroupDetailComponent;
}());
exports.GroupDetailComponent = GroupDetailComponent;
//# sourceMappingURL=group-detail.component.js.map