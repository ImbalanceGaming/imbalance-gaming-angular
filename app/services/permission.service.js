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
var Observable_1 = require("rxjs/Observable");
require('rxjs/add/operator/share');
var api_service_1 = require("./api.service");
var messages_service_1 = require("../directives/messages/messages.service");
var table_service_1 = require("../directives/tables/table.service");
var table_data_service_1 = require("./table-data.service");
var group_service_1 = require("./group.service");
var user_service_1 = require("./user.service");
var module_section_service_1 = require("./module-section.service");
var permission_1 = require("../models/permission");
var PermissionService = (function () {
    function PermissionService(_apiService, _messageService, _tableService, _tableDataService, _groupService, _userService, _moduleSectionService) {
        var _this = this;
        this._apiService = _apiService;
        this._messageService = _messageService;
        this._tableService = _tableService;
        this._tableDataService = _tableDataService;
        this._groupService = _groupService;
        this._userService = _userService;
        this._moduleSectionService = _moduleSectionService;
        this._permissions = [];
        this.permissions$ = Observable_1.Observable.create(function (observer) { return _this._permissionsObserver = observer; }).share();
        this._userService.user$.subscribe(function (user) { return _this._user = user; });
    }
    PermissionService.prototype.create = function (permissionData) {
        return new permission_1.Permission(permissionData.id, permissionData.name, permissionData.description, permissionData.view, permissionData.add, permissionData.edit, permissionData.delete);
    };
    PermissionService.prototype.get = function (id) {
        return Promise.resolve(this._permissions).then(function (permissions) { return permissions.filter(function (permission) { return permission.id === id; })[0]; });
    };
    PermissionService.prototype.getPermissions = function (page, queryAPI, buildTableData) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (queryAPI === void 0) { queryAPI = false; }
        if (buildTableData === void 0) { buildTableData = false; }
        if (this._permissions.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('permissions?page=' + page)
                .then(function (data) { return _this.buildPermissions(data, buildTableData); }, function (error) {
                _this._messageService.addMessage({
                    success: null,
                    error: error
                });
            });
        }
        else {
            return Promise.resolve(this._permissions).then(function (permissions) {
                _this.set(permissions);
                if (buildTableData) {
                    _this.updateTable();
                }
            });
        }
    };
    PermissionService.prototype.set = function (permissions) {
        this._permissions = permissions;
        this._permissionsObserver.next(this._permissions);
    };
    PermissionService.prototype.add = function (permission) {
        var _this = this;
        this._apiService.postWithAuth('permissions', this.generateData(permission)).subscribe(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        }, function () {
            _this.getPermissions(1, true, true).then(function () {
                _this.getPermissions(_this._tableDataService.table.totalPages, true, true);
            });
        });
    };
    PermissionService.prototype.update = function (permission) {
        var _this = this;
        this._apiService.patch('permissions/' + permission.id, this.generateData(permission)).subscribe(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.delete = function (permission) {
        var _this = this;
        this._apiService.delete('permissions/' + permission.id).subscribe(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        }, function () {
            _this.getPermissions(1, true, true).then(function () {
                _this.getPermissions(_this._tableDataService.table.totalPages, true, true);
            });
        });
    };
    PermissionService.prototype.generateData = function (permission) {
        return {
            'name': permission.name,
            'description': permission.description,
            'view': permission.view,
            'add': permission.add,
            'edit': permission.edit,
            'delete': permission.delete
        };
    };
    PermissionService.prototype.addUserToPermission = function (permissionId, userId) {
        var _this = this;
        return this._apiService.patchPromise('addUserToPermission/' + permissionId, { user_id: userId })
            .then(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.removeUserFromPermission = function (permissionId, userId) {
        var _this = this;
        return this._apiService.patchPromise('removeUserFromPermission/' + permissionId, { user_id: userId })
            .then(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.addGroupToPermission = function (permissionId, groupId) {
        var _this = this;
        return this._apiService.patchPromise('addGroupToPermission/' + permissionId, { group_id: groupId })
            .then(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.removeGroupFromPermission = function (permissionId, groupId) {
        var _this = this;
        return this._apiService.patchPromise('removeGroupFromPermission/' + permissionId, { group_id: groupId })
            .then(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.addModuleSectionToPermission = function (permissionId, moduleSectionId) {
        var _this = this;
        return this._apiService.patchPromise('addModuleSectionToPermission/' + permissionId, { module_section_id: moduleSectionId })
            .then(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.removeModuleSectionFromPermission = function (permissionId, moduleSectionId) {
        var _this = this;
        return this._apiService.patchPromise('removeSectionFromPermission/' + permissionId, { module_section_id: moduleSectionId })
            .then(function (data) {
            _this._messageService.addMessage({
                success: data.success.message,
                error: null
            });
        }, function (error) {
            _this._messageService.addMessage({
                success: null,
                error: error.message
            });
        });
    };
    PermissionService.prototype.getUserAccessLevel = function (module) {
        var _this = this;
        return this._userService.getUserWithPermissions().then(function (userPermissions) {
            userPermissions.some(function (permission) {
                var permissionObject = _this.create(permission);
                if (permissionObject.name == 'Admin Access') {
                    module.permission = permissionObject;
                    module.sections.forEach(function (section, index) {
                        module.sections[index].permission = permissionObject;
                    }, _this);
                }
                else {
                }
            }, _this);
            return module;
        });
    };
    PermissionService.prototype.buildPermissions = function (permissionsData, buildTableData) {
        var _this = this;
        if (buildTableData === void 0) { buildTableData = false; }
        this._permissions = [];
        var _loop_1 = function(key) {
            var permissionInfo = void 0;
            var usersData = void 0;
            var groupsData = void 0;
            var moduleSectionsData = void 0;
            if (permissionsData.data.hasOwnProperty(key)) {
                //noinspection TypeScriptUnresolvedVariable
                permissionInfo = permissionsData.data[key].permission;
                usersData = permissionsData.data[key].users;
                groupsData = permissionsData.data[key].groups;
                moduleSectionsData = permissionsData.data[key].module_sections;
            }
            var permission = this_1.create(permissionInfo);
            if (usersData.length > 0) {
                var users_1 = [];
                usersData.forEach(function (userData) {
                    users_1.push(_this._userService.create(userData));
                });
                permission.users = users_1;
            }
            if (groupsData.length > 0) {
                var groups_1 = [];
                groupsData.forEach(function (groupData) {
                    groups_1.push(_this._groupService.create(groupData));
                });
                permission.groups = groups_1;
            }
            if (moduleSectionsData.length > 0) {
                var moduleSection_1 = [];
                moduleSectionsData.forEach(function (moduleSectionsData) {
                    moduleSection_1.push(_this._moduleSectionService.create(moduleSectionsData));
                });
                permission.module_sections = moduleSection_1;
            }
            this_1._permissions.push(permission);
        };
        var this_1 = this;
        for (var key in permissionsData.data) {
            _loop_1(key);
        }
        this.set(this._permissions);
        if (buildTableData) {
            this._tableDataService.getPermissionTableData(this._permissions, true, permissionsData.paginator)
                .then(function (table) { return _this._tableService.addTable(table); });
        }
    };
    PermissionService.prototype.updateTable = function () {
        var _this = this;
        this._tableDataService.getPermissionTableData(this._permissions, false)
            .then(function (table) { return _this._tableService.addTable(table); });
    };
    PermissionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService, group_service_1.GroupService, user_service_1.UserService, module_section_service_1.ModuleSectionService])
    ], PermissionService);
    return PermissionService;
}());
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map