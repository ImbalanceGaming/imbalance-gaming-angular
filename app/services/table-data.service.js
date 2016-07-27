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
var TableDataService = (function () {
    function TableDataService() {
        this.table = {
            headers: [],
            body: {
                rows: []
            },
            detailURL: '',
            paginationConfig: {
                itemsPerPage: 10,
                currentPage: 1
            },
            totalPages: 1
        };
    }
    TableDataService.prototype.getUsersTableData = function (users, updateTableConfig, paginatorData) {
        var _this = this;
        if (updateTableConfig === void 0) { updateTableConfig = true; }
        return Promise.resolve(users).then(function (users) {
            if (updateTableConfig) {
                _this.updateTableConfig(paginatorData, 'users-paginator', 'UserDetail');
            }
            _this.table.body.rows = [];
            _this.table.headers = [
                { value: 'Full Name', show: true },
                { value: 'Role', show: true },
                { value: 'Username', show: true },
                { value: 'Email', show: true },
                { value: 'Last Session', show: true },
                { value: 'Deactivate', show: false }
            ];
            users.forEach(function (user) {
                var activeStatusText = (user.active == true) ? 'deactivate' : 'activate';
                this.table.body.rows.push({
                    rowId: user.id,
                    cells: [
                        { value: user.forename + " " + user.surname, detailCell: true, clickEvent: false },
                        { value: user.role, detailCell: false, clickEvent: false },
                        { value: user.username, detailCell: false, clickEvent: false },
                        { value: user.email, detailCell: false, clickEvent: false },
                        { value: user.last_login, detailCell: false, clickEvent: false },
                        { value: activeStatusText, detailCell: false, clickEvent: true },
                    ]
                });
            }, _this);
            return _this.table;
        });
    };
    TableDataService.prototype.getGroupsTableData = function (groups, updateTableConfig, paginatorData) {
        var _this = this;
        if (updateTableConfig === void 0) { updateTableConfig = true; }
        return Promise.resolve(groups).then(function (groups) {
            if (updateTableConfig) {
                _this.updateTableConfig(paginatorData, 'groups-paginator', 'GroupDetail');
            }
            _this.table.body.rows = [];
            _this.table.headers = [
                { value: 'Name', show: true },
                { value: 'Description', show: true }
            ];
            groups.forEach(function (group) {
                this.table.body.rows.push({
                    rowId: group.id,
                    cells: [
                        { value: group.name, detailCell: true, clickEvent: false },
                        { value: group.description, detailCell: false, clickEvent: false },
                    ]
                });
            }, _this);
            return _this.table;
        });
    };
    TableDataService.prototype.getProjectsTableData = function (projects, updateTableConfig, paginatorData) {
        var _this = this;
        if (updateTableConfig === void 0) { updateTableConfig = true; }
        return Promise.resolve(projects).then(function (projects) {
            if (updateTableConfig) {
                _this.updateTableConfig(paginatorData, 'projects-paginator', 'projectDetail');
            }
            _this.table.body.rows = [];
            _this.table.headers = [
                { value: 'Key', show: true },
                { value: 'Name', show: true },
                { value: 'Description', show: true },
                { value: 'Project Lead', show: true },
                { value: 'Project URL', show: true },
                { value: 'Packages', show: true },
            ];
            projects.forEach(function (project) {
                this.table.body.rows.push({
                    rowId: project.id,
                    cells: [
                        { value: project.key, detailCell: true, clickEvent: false },
                        { value: project.name, detailCell: false, clickEvent: false },
                        { value: project.description, detailCell: false, clickEvent: false },
                        {
                            value: project.lead_user ? project.lead_user.forename + ' ' + project.lead_user.surname : 'None',
                            detailCell: false, clickEvent: false },
                        { value: project.url ? project.url : 'N/A', detailCell: false, clickEvent: false },
                        { value: project.packages.length, detailCell: false, clickEvent: false }
                    ]
                });
            }, _this);
            return _this.table;
        });
    };
    TableDataService.prototype.getProjectPackageTableData = function (packages, updateTableConfig, paginatorData) {
        if (updateTableConfig === void 0) { updateTableConfig = true; }
    };
    TableDataService.prototype.getModuleTableData = function (modules, updateTableConfig, paginatorData) {
        if (updateTableConfig === void 0) { updateTableConfig = true; }
    };
    TableDataService.prototype.getModuleSectionTableData = function (moduleSections, updateTableConfig, paginatorData) {
        if (updateTableConfig === void 0) { updateTableConfig = true; }
    };
    TableDataService.prototype.getPermissionTableData = function (permissions, updateTableConfig, paginatorData) {
        var _this = this;
        if (updateTableConfig === void 0) { updateTableConfig = true; }
        return Promise.resolve(permissions).then(function (permissions) {
            if (updateTableConfig) {
                _this.updateTableConfig(paginatorData, 'permissions-paginator', 'PermissionDetail');
            }
            _this.table.body.rows = [];
            _this.table.headers = [
                { value: 'Name', show: true },
                { value: 'Description', show: true },
                { value: 'View', show: true },
                { value: 'Add', show: true },
                { value: 'Edit', show: true },
                { value: 'Delete', show: true }
            ];
            permissions.forEach(function (permission) {
                this.table.body.rows.push({
                    rowId: permission.id,
                    cells: [
                        { value: permission.name, detailCell: true, clickEvent: false },
                        { value: permission.description, detailCell: false, clickEvent: false },
                        { value: permission.view, detailCell: false, clickEvent: false, icon: true },
                        { value: permission.add, detailCell: false, clickEvent: false, icon: true },
                        { value: permission.edit, detailCell: false, clickEvent: false, icon: true },
                        { value: permission.delete, detailCell: false, clickEvent: false, icon: true }
                    ]
                });
            }, _this);
            return _this.table;
        });
    };
    TableDataService.prototype.updateTableConfig = function (paginatorData, id, detailURL) {
        this.table.paginationConfig.itemsPerPage = paginatorData.per_page;
        this.table.paginationConfig.totalItems = paginatorData.per_page * paginatorData.last_page;
        this.table.paginationConfig.currentPage = paginatorData.current_page;
        this.table.paginationConfig.id = id;
        this.table.totalPages = paginatorData.last_page;
        this.table.detailURL = detailURL;
    };
    TableDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TableDataService);
    return TableDataService;
}());
exports.TableDataService = TableDataService;
//# sourceMappingURL=table-data.service.js.map