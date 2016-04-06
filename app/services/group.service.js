System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/operator/share', "./api.service", "./user.service", "../models/group", "../directives/messages/messages.service", "../directives/tables/table.service", "./table-data.service", "./project.service"], function(exports_1, context_1) {
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
    var core_1, Observable_1, api_service_1, user_service_1, group_1, messages_service_1, table_service_1, table_data_service_1, project_service_1;
    var GroupService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (group_1_1) {
                group_1 = group_1_1;
            },
            function (messages_service_1_1) {
                messages_service_1 = messages_service_1_1;
            },
            function (table_service_1_1) {
                table_service_1 = table_service_1_1;
            },
            function (table_data_service_1_1) {
                table_data_service_1 = table_data_service_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            }],
        execute: function() {
            GroupService = (function () {
                function GroupService(_apiService, _userService, _messageService, _tableService, _tableDataService, _projectService) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._userService = _userService;
                    this._messageService = _messageService;
                    this._tableService = _tableService;
                    this._tableDataService = _tableDataService;
                    this._projectService = _projectService;
                    this._groups = [];
                    this.groups$ = Observable_1.Observable.create(function (observer) { return _this._groupsObserver = observer; }).share();
                }
                GroupService.prototype.create = function (groupData) {
                    return new group_1.Group(groupData.id, groupData.name, groupData.description);
                };
                GroupService.prototype.get = function (id) {
                    return Promise.resolve(this._groups).then(function (groups) { return groups.filter(function (group) { return group.id === id; })[0]; });
                };
                GroupService.prototype.getGroups = function (page, queryAPI, buildTableData) {
                    var _this = this;
                    if (page === void 0) { page = 1; }
                    if (queryAPI === void 0) { queryAPI = false; }
                    if (buildTableData === void 0) { buildTableData = false; }
                    if (this._groups.length === 0 || queryAPI) {
                        return this._apiService.getPromiseWithAuth('groups?page=' + page)
                            .then(function (data) { return _this.buildGroups(data, buildTableData); }, function (error) {
                            _this._messageService.addMessage({
                                success: null,
                                error: error
                            });
                        });
                    }
                    else {
                        return Promise.resolve(this._groups).then(function (groups) {
                            _this.set(groups);
                            if (buildTableData) {
                                _this.updateTable();
                            }
                        });
                    }
                };
                GroupService.prototype.set = function (groups) {
                    this._groups = groups;
                    this._groupsObserver.next(this._groups);
                };
                GroupService.prototype.add = function (group) {
                    var _this = this;
                    this._apiService.postWithAuth('groups', this.generateData(group)).subscribe(function (data) {
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
                        _this.getGroups(1, true, true).then(function () {
                            _this.getGroups(_this._tableDataService.table.totalPages, true, true);
                        });
                    });
                };
                GroupService.prototype.update = function (group) {
                    var _this = this;
                    this._apiService.patch('groups/' + group.id, this.generateData(group)).subscribe(function (data) {
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
                GroupService.prototype.delete = function (group) {
                    var _this = this;
                    this._apiService.delete('groups/' + group.id).subscribe(function (data) {
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
                        _this.getGroups(1, true, true).then(function () {
                            _this.getGroups(_this._tableDataService.table.totalPages, true, true);
                        });
                    });
                };
                GroupService.prototype.generateData = function (group) {
                    var userIds = [];
                    var projectIds = [];
                    if (group.users.length > 0) {
                        group.users.forEach(function (user) { return userIds.push(user.id); });
                    }
                    if (group.projects.length > 0) {
                        group.projects.forEach(function (project) { return projectIds.push(project.id); });
                    }
                    return {
                        name: group.name,
                        description: group.description,
                        users: userIds,
                        projects: projectIds
                    };
                };
                GroupService.prototype.findGroups = function (searchTerm) {
                    return this._apiService.getPromiseWithAuth('findGroups/' + searchTerm)
                        .then(function (data) {
                        var groupData = [];
                        data.data.forEach(function (group) {
                            groupData.push({
                                id: group.id,
                                name: group.name
                            });
                        });
                        return groupData;
                    }, function (error) {
                        return [];
                    });
                };
                GroupService.prototype.addUserToGroup = function (groupId, userId) {
                    var _this = this;
                    return this._apiService.patchPromise('addUserToGroup/' + groupId, { user_id: userId })
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
                GroupService.prototype.removeUserFromGroup = function (groupId, userId) {
                    var _this = this;
                    return this._apiService.patchPromise('removeUserFromGroup/' + groupId, { user_id: userId })
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
                GroupService.prototype.addProjectToGroup = function (groupId, projectId) {
                    var _this = this;
                    return this._apiService.patchPromise('addProjectToGroup/' + groupId, { project_id: projectId })
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
                GroupService.prototype.removeProjectFromGroup = function (groupId, projectId) {
                    var _this = this;
                    return this._apiService.patchPromise('removeProjectFromGroup/' + groupId, { project_id: projectId })
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
                /**
                 *
                 * @param {Object[]} groupsData
                 * @param {boolean} buildTableData
                 * @param {Object[]} groupsData.data
                 * @param {Object} groupsData.data.group
                 * @param {Object[]} groupsData.data.users
                 * @param {Object} groupsData.paginator
                 * @param {Object} groupsData.paginator.per_page
                 * @param {Object} groupsData.paginator.last_page
                 * @param {Object} groupsData.paginator.current_page
                 */
                GroupService.prototype.buildGroups = function (groupsData, buildTableData) {
                    var _this = this;
                    if (buildTableData === void 0) { buildTableData = false; }
                    this._groups = [];
                    var _loop_1 = function(key) {
                        var groupInfo = void 0;
                        var groupUsers = void 0;
                        var groupProjects = void 0;
                        if (groupsData.data.hasOwnProperty(key)) {
                            groupInfo = groupsData.data[key].group;
                            groupUsers = groupsData.data[key].users;
                            groupProjects = groupsData.data[key].projects;
                        }
                        var group = this_1.create(groupInfo);
                        if (groupUsers.length > 0) {
                            var users_1 = [];
                            groupUsers.forEach(function (userData) {
                                users_1.push(_this._userService.create(userData));
                            });
                            group.users = users_1;
                        }
                        if (groupProjects.length > 0) {
                            var project_1 = [];
                            groupProjects.forEach(function (projectData) {
                                project_1.push(_this._projectService.create(projectData));
                            });
                            group.projects = project_1;
                        }
                        this_1._groups.push(group);
                    };
                    var this_1 = this;
                    for (var key in groupsData.data) {
                        _loop_1(key);
                    }
                    this.set(this._groups);
                    if (buildTableData) {
                        this._tableDataService.getGroupsTableData(this._groups, true, groupsData.paginator)
                            .then(function (table) { return _this._tableService.addTable(table); });
                    }
                };
                GroupService.prototype.updateTable = function () {
                    var _this = this;
                    this._tableDataService.getGroupsTableData(this._groups, false)
                        .then(function (table) { return _this._tableService.addTable(table); });
                };
                GroupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, user_service_1.UserService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService, project_service_1.ProjectService])
                ], GroupService);
                return GroupService;
            }());
            exports_1("GroupService", GroupService);
        }
    }
});
//# sourceMappingURL=group.service.js.map