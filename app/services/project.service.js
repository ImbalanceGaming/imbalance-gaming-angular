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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var project_1 = require("../models/project");
var api_service_1 = require("./api.service");
var messages_service_1 = require("../directives/messages/messages.service");
var table_service_1 = require("../directives/tables/table.service");
var table_data_service_1 = require("./table-data.service");
var user_service_1 = require("./user.service");
var project_package_1 = require("../models/project-package");
var project_history_1 = require("../models/project-history");
var server_1 = require("../models/server");
var ProjectService = (function () {
    function ProjectService(_apiService, _userService, _messageService, _tableService, _tableDataService) {
        var _this = this;
        this._apiService = _apiService;
        this._userService = _userService;
        this._messageService = _messageService;
        this._tableService = _tableService;
        this._tableDataService = _tableDataService;
        this._projects = [];
        this.projects$ = Observable_1.Observable.create(function (observer) { return _this._projectsObserver = observer; }).share();
    }
    ProjectService.prototype.create = function (projectData) {
        var project = new project_1.Project;
        project.id = projectData.id;
        project.key = projectData.key;
        project.name = projectData.name;
        project.description = projectData.description;
        project.url = projectData.url;
        return project;
    };
    ProjectService.prototype.get = function (id) {
        return Promise.resolve(this._projects).then(function (projects) { return projects.filter(function (project) { return project.id === id; })[0]; });
    };
    ProjectService.prototype.getProjects = function (page, queryAPI, buildTableData) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (queryAPI === void 0) { queryAPI = false; }
        if (buildTableData === void 0) { buildTableData = false; }
        if (this._projects.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('projects?page=' + page)
                .then(function (data) { return _this.buildProjects(data, buildTableData); }, function (error) {
                _this._messageService.addMessage({
                    success: null,
                    error: error
                });
            });
        }
        else {
            return Promise.resolve(this._projects).then(function (projects) {
                _this.set(projects);
                if (buildTableData) {
                    _this.updateTable();
                }
            });
        }
    };
    ProjectService.prototype.set = function (projects) {
        this._projects = projects;
        this._projectsObserver.next(this._projects);
    };
    ProjectService.prototype.add = function (project) {
        var _this = this;
        this._apiService.postWithAuth('projects', this.generateData(project)).subscribe(function (data) {
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
            _this.getProjects(1, true, true).then(function () {
                _this.getProjects(_this._tableDataService.table.totalPages, true, true);
            });
        });
    };
    ProjectService.prototype.update = function (project) {
        var _this = this;
        return this._apiService.patchPromise('projects/' + project.id, this.generateData(project)).then(function (data) {
            if (data.success) {
                _this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                });
            }
            else {
                _this._messageService.addMessage({
                    success: null,
                    error: data.error.message
                });
            }
        });
    };
    ProjectService.prototype.delete = function (project) {
        var _this = this;
        this._apiService.delete('projects/' + project.id).subscribe(function (data) {
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
            _this.getProjects(1, true, true).then(function () {
                _this.getProjects(_this._tableDataService.table.totalPages, true, true);
            });
        });
    };
    ProjectService.prototype.generateData = function (project) {
        return {
            key: project.key,
            name: project.name,
            description: project.description,
            url: project.url,
            lead_user_id: project.lead_user_id,
        };
    };
    ProjectService.prototype.deploy = function (projectId, serverId, userId) {
        var _this = this;
        return this._apiService.getPromiseWithAuth('deployProject/' + projectId + '?serverID=' + serverId + '&userID=' + userId).then(function (data) {
            if (data.success) {
                _this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                });
            }
            else {
                _this._messageService.addMessage({
                    success: null,
                    error: data.error.message
                });
            }
        });
    };
    ProjectService.prototype.findProjects = function (searchTerm) {
        return this._apiService.getPromiseWithAuth('findProjects/' + searchTerm)
            .then(function (data) {
            var projectData = [];
            data.data.forEach(function (project) {
                projectData.push({
                    id: project.id,
                    name: '[' + project.key + '] ' + project.name
                });
            });
            return projectData;
        }, function (error) {
            return [];
        });
    };
    ProjectService.prototype.buildProjects = function (projectsData, buildTableData) {
        var _this = this;
        if (buildTableData === void 0) { buildTableData = false; }
        this._projects = [];
        var _loop_1 = function(key) {
            var projectInfo = void 0;
            var projectLeadUser = void 0;
            var projectPackages = void 0;
            var projectHistory = void 0;
            var projectServers = void 0;
            var projectDeploymentStats = void 0;
            if (projectsData.data.hasOwnProperty(key)) {
                projectInfo = projectsData.data[key].project;
                projectLeadUser = projectsData.data[key].lead_user;
                projectPackages = projectsData.data[key].project_packages;
                projectHistory = projectsData.data[key].project_history;
                projectServers = projectsData.data[key].servers;
                projectDeploymentStats = projectsData.data[key].deployment_stats;
            }
            var project = this_1.create(projectInfo);
            if (projectLeadUser != null) {
                project.lead_user = this_1._userService.create(projectLeadUser);
            }
            if (projectPackages.length > 0) {
                projectPackages.forEach(function (packageData) {
                    var projectPackage = new project_package_1.ProjectPackage(packageData.id, packageData.name, packageData.repository, packageData.deploy_branch, packageData.deploy_location);
                    projectPackage.project = project;
                    project.packages.push(projectPackage);
                });
            }
            if (projectHistory.length > 0) {
                projectHistory.forEach(function (historyData) {
                    var projectHistory = new project_history_1.ProjectHistory(historyData.id, historyData.deployment_date, historyData.user, historyData.server, historyData.status);
                    project.history.push(projectHistory);
                });
            }
            if (projectServers.length > 0) {
                projectServers.forEach(function (serverData) {
                    var server = new server_1.Server(serverData.id, serverData.name, serverData.address);
                    project.servers.push(server);
                });
            }
            project.deploymentStats.today = projectDeploymentStats.today;
            project.deploymentStats.week = projectDeploymentStats.week;
            project.deploymentStats.duration = projectDeploymentStats.duration;
            this_1._projects.push(project);
        };
        var this_1 = this;
        for (var key in projectsData.data) {
            _loop_1(key);
        }
        this.set(this._projects);
        if (buildTableData) {
            this._tableDataService.getProjectsTableData(this._projects, true, projectsData.paginator)
                .then(function (table) { return _this._tableService.addTable(table); });
        }
    };
    ProjectService.prototype.updateTable = function () {
        var _this = this;
        this._tableDataService.getProjectsTableData(this._projects, false)
            .then(function (table) { return _this._tableService.addTable(table); });
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService, user_service_1.UserService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map