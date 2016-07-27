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
var dynamic_modal_form_directive_1 = require("../../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive");
var group_service_1 = require("../../../../services/group.service");
var user_service_1 = require("../../../../services/user.service");
var permission_1 = require("../../../../models/permission");
var module_section_service_1 = require("../../../../services/module-section.service");
var permission_service_1 = require("../../../../services/permission.service");
var PermissionDetailComponent = (function () {
    function PermissionDetailComponent(_route, _router, _formDataService, _permissionService, _userService, _groupService, _moduleSectionService) {
        var _this = this;
        this._route = _route;
        this._router = _router;
        this._formDataService = _formDataService;
        this._permissionService = _permissionService;
        this._userService = _userService;
        this._groupService = _groupService;
        this._moduleSectionService = _moduleSectionService;
        this.permissions = [];
        this.formData = [];
        this.formButtonData = [];
        this.userModalFormData = [];
        this.userSearchReturn = [];
        this.groupModalFormData = [];
        this.groupSearchReturn = [];
        this.moduleSectionModalFormData = [];
        this.moduleSectionSearchReturn = [];
        this.title = 'Permission Detail';
        this.permission = new permission_1.Permission();
        this._formDataService.getAddUserData()
            .then(function (formData) { return _this.userModalFormData = formData; });
        this._formDataService.getAddGroupData()
            .then(function (formData) { return _this.groupModalFormData = formData; });
        this._formDataService.getAddModuleSectionData()
            .then(function (formData) { return _this.moduleSectionModalFormData = formData; });
    }
    PermissionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._permissionService.permissions$.subscribe(function (permissions) { return _this.permissions = permissions; });
        this.updateForm();
    };
    PermissionDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    PermissionDetailComponent.prototype.saveChanges = function (formData) {
        this.permission.name = formData.name;
        this.permission.description = formData.description;
        this.permission.view = formData.view ? true : false;
        this.permission.add = formData.add ? true : false;
        this.permission.edit = formData.edit ? true : false;
        this.permission.delete = formData.delete ? true : false;
        this._permissionService.update(this.permission);
    };
    PermissionDetailComponent.prototype.cancelEdit = function () {
        this._router.navigate(['Permissions']);
    };
    PermissionDetailComponent.prototype.deleteUser = function () {
        this._permissionService.delete(this.permission);
        this._router.navigate(['Permissions']);
    };
    PermissionDetailComponent.prototype.onAddUser = function (formData) {
        var _this = this;
        //noinspection TypeScriptUnresolvedVariable
        this._permissionService.addUserToPermission(this.permission.id, formData.selectedSearchValue)
            .then(function () {
            _this.updateForm();
        });
    };
    PermissionDetailComponent.prototype.onUserSearch = function (searchValue) {
        var _this = this;
        this._userService.findUsers(searchValue)
            .then(function (data) { return _this.userSearchReturn = data; });
    };
    PermissionDetailComponent.prototype.onRemoveUser = function (userId) {
        var _this = this;
        this._permissionService.removeUserFromPermission(this.permission.id, userId)
            .then(function () {
            _this.updateForm();
        });
    };
    PermissionDetailComponent.prototype.onAddGroup = function (formData) {
        var _this = this;
        //noinspection TypeScriptUnresolvedVariable
        this._permissionService.addGroupToPermission(this.permission.id, formData.selectedSearchValue)
            .then(function () {
            _this.updateForm();
        });
    };
    PermissionDetailComponent.prototype.onGroupSearch = function (searchValue) {
        var _this = this;
        this._groupService.findGroups(searchValue)
            .then(function (data) { return _this.groupSearchReturn = data; });
    };
    PermissionDetailComponent.prototype.onRemoveGroup = function (groupId) {
        var _this = this;
        this._permissionService.removeGroupFromPermission(this.permission.id, groupId)
            .then(function () {
            _this.updateForm();
        });
    };
    PermissionDetailComponent.prototype.onAddModuleSection = function (formData) {
        var _this = this;
        //noinspection TypeScriptUnresolvedVariable
        this._permissionService.addModuleSectionToPermission(this.permission.id, formData.selectedSearchValue)
            .then(function () {
            _this.updateForm();
        });
    };
    PermissionDetailComponent.prototype.onModuleSectionSearch = function (searchValue) {
        var _this = this;
        this._moduleSectionService.findModuleSections(searchValue)
            .then(function (data) { return _this.moduleSectionSearchReturn = data; });
    };
    PermissionDetailComponent.prototype.onRemoveModuleSection = function (moduleSectionId) {
        var _this = this;
        this._permissionService.removeModuleSectionFromPermission(this.permission.id, moduleSectionId)
            .then(function () {
            _this.updateForm();
        });
    };
    PermissionDetailComponent.prototype.updateForm = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            var page = +params['page'];
            _this._permissionService.getPermissions(page, true).then(function () {
                _this._permissionService.get(id).then(function (permission) {
                    _this.permission = permission;
                    _this._formDataService.getPermissionDetailData(permission)
                        .then(function (formData) { return _this.formData = formData; });
                    _this._formDataService.getDefaultButtons()
                        .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                    _this._formDataService.getAddUserData()
                        .then(function (formData) { return _this.userModalFormData = formData; });
                    _this._formDataService.getAddGroupData()
                        .then(function (formData) { return _this.groupModalFormData = formData; });
                    _this._formDataService.getAddModuleSectionData()
                        .then(function (formData) { return _this.moduleSectionModalFormData = formData; });
                });
            });
        });
    };
    PermissionDetailComponent = __decorate([
        core_1.Component({
            selector: 'permission-detail',
            templateUrl: 'app/components/userManagement/permissions/permissionDetail/permission-detail.component.html',
            styleUrls: ['app/components/userManagement/permissions/permissionDetail/permission-detail.component.css'],
            directives: [dynamic_form_directive_1.DynamicFormDirective, messages_directive_1.MessagesDirective, router_1.ROUTER_DIRECTIVES, dynamic_modal_form_directive_1.DynamicModalFormDirective]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, form_data_service_1.FormDataService, permission_service_1.PermissionService, user_service_1.UserService, group_service_1.GroupService, module_section_service_1.ModuleSectionService])
    ], PermissionDetailComponent);
    return PermissionDetailComponent;
}());
exports.PermissionDetailComponent = PermissionDetailComponent;
//# sourceMappingURL=permission-detail.component.js.map