System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/operator/share', "./api.service", "../directives/messages/messages.service", "../directives/tables/table.service", "./table-data.service", "../models/project-package", "../models/project-package-command"], function(exports_1, context_1) {
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
    var core_1, Observable_1, api_service_1, messages_service_1, table_service_1, table_data_service_1, project_package_1, project_package_command_1;
    var ProjectPackageService;
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
            function (messages_service_1_1) {
                messages_service_1 = messages_service_1_1;
            },
            function (table_service_1_1) {
                table_service_1 = table_service_1_1;
            },
            function (table_data_service_1_1) {
                table_data_service_1 = table_data_service_1_1;
            },
            function (project_package_1_1) {
                project_package_1 = project_package_1_1;
            },
            function (project_package_command_1_1) {
                project_package_command_1 = project_package_command_1_1;
            }],
        execute: function() {
            ProjectPackageService = (function () {
                function ProjectPackageService(_apiService, _messageService, _tableService, _tableDataService) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._messageService = _messageService;
                    this._tableService = _tableService;
                    this._tableDataService = _tableDataService;
                    this._projectPackages = [];
                    this._projectPackage = new project_package_1.ProjectPackage();
                    this.projectPackages$ = Observable_1.Observable.create(function (observer) { return _this._projectPackagesObserver = observer; }).share();
                    this.projectPackage$ = Observable_1.Observable.create(function (observer) { return _this._projectPackageObserver = observer; }).share();
                }
                ProjectPackageService.prototype.create = function (projectPackageData) {
                    return new project_package_1.ProjectPackage(projectPackageData.id, projectPackageData.name, projectPackageData.repository, projectPackageData.deploy_branch, projectPackageData.deploy_location);
                };
                ProjectPackageService.prototype.get = function (id) {
                    return Promise.resolve(this._projectPackages).then(function (projectPackages) { return projectPackages.filter(function (projectPackage) { return projectPackage.id === id; })[0]; });
                };
                ProjectPackageService.prototype.getPackage = function () {
                    return this._projectPackage;
                };
                ProjectPackageService.prototype.getProjectPackage = function (id) {
                    var _this = this;
                    return this._apiService.getPromiseWithAuth('projectPackages/' + id)
                        .then(function (data) { return _this.buildProjectPackage(data, false); }, function (error) {
                        _this._messageService.addMessage({
                            success: null,
                            error: error
                        });
                    });
                };
                ProjectPackageService.prototype.getProjectPackages = function (page, queryAPI, buildTableData) {
                    var _this = this;
                    if (page === void 0) { page = 1; }
                    if (queryAPI === void 0) { queryAPI = false; }
                    if (buildTableData === void 0) { buildTableData = false; }
                    if (this._projectPackages.length === 0 || queryAPI) {
                        return this._apiService.getPromiseWithAuth('projectPackages?page=' + page)
                            .then(function (data) { return _this.buildProjectPackages(data, buildTableData); }, function (error) {
                            _this._messageService.addMessage({
                                success: null,
                                error: error
                            });
                        });
                    }
                    else {
                        return Promise.resolve(this._projectPackages).then(function (projectPackages) {
                            _this.set(projectPackages);
                            if (buildTableData) {
                                _this.updateTable();
                            }
                        });
                    }
                };
                ProjectPackageService.prototype.set = function (projectPackages) {
                    this._projectPackages = projectPackages;
                    this._projectPackagesObserver.next(this._projectPackages);
                };
                ProjectPackageService.prototype.setPackage = function (projectPackage) {
                    this._projectPackage = projectPackage;
                    // this._projectPackageObserver.next(this._projectPackage);
                };
                ProjectPackageService.prototype.add = function (projectPackage) {
                    var _this = this;
                    return this._apiService.postPromiseWithAuth('projectPackages', this.generateData(projectPackage)).then(function (data) {
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
                ProjectPackageService.prototype.update = function (projectPackage) {
                    var _this = this;
                    return this._apiService.patchPromise('projectPackages/' + projectPackage.id, this.generateData(projectPackage)).then(function (data) {
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
                ProjectPackageService.prototype.delete = function (projectPackage) {
                    var _this = this;
                    return this._apiService.deletePromise('projectPackages/' + projectPackage.id).then(function (data) {
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
                ProjectPackageService.prototype.generateData = function (projectPackage) {
                    return {
                        name: projectPackage.name,
                        repository: projectPackage.repository,
                        deploy_branch: projectPackage.deploy_branch,
                        deploy_location: projectPackage.deploy_location,
                        project_id: projectPackage.project.id,
                    };
                };
                ProjectPackageService.prototype.buildProjectPackages = function (projectPackagesData, buildTableData) {
                    var _this = this;
                    if (buildTableData === void 0) { buildTableData = false; }
                    this._projectPackages = [];
                    for (var key in projectPackagesData.data) {
                        if (projectPackagesData.data.hasOwnProperty(key)) {
                            this._projectPackages.push(this.buildProjectPackage(projectPackagesData.data[key]));
                        }
                    }
                    this.set(this._projectPackages);
                    if (buildTableData) {
                        this._tableDataService.getProjectPackageTableData(this._projectPackages, true, projectPackagesData.paginator)
                            .then(function (table) { return _this._tableService.addTable(table); });
                    }
                };
                ProjectPackageService.prototype.buildProjectPackage = function (packageData, forGroup) {
                    if (forGroup === void 0) { forGroup = true; }
                    var projectPackageInfo;
                    var projectPackageCommands;
                    projectPackageInfo = packageData.package;
                    projectPackageCommands = packageData.commands;
                    var projectPackage = this.create(projectPackageInfo);
                    projectPackage.project.id = projectPackageInfo.project_id;
                    if (projectPackageCommands.length > 0) {
                        projectPackageCommands.forEach(function (packageCommandData) {
                            var projectPackageCommand = new project_package_command_1.ProjectPackageCommand(packageCommandData.id, packageCommandData.command, packageCommandData.order, packageCommandData.run_on, packageCommandData.command_type, packageCommandData.project_package_id);
                            projectPackage.commands.push(projectPackageCommand);
                        });
                    }
                    if (!forGroup) {
                        this.setPackage(projectPackage);
                    }
                    return projectPackage;
                };
                ProjectPackageService.prototype.updateTable = function () {
                    var _this = this;
                    this._tableDataService.getProjectPackageTableData(this._projectPackages, false)
                        .then(function (table) { return _this._tableService.addTable(table); });
                };
                ProjectPackageService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService])
                ], ProjectPackageService);
                return ProjectPackageService;
            }());
            exports_1("ProjectPackageService", ProjectPackageService);
        }
    }
});
//# sourceMappingURL=project-package.service.js.map