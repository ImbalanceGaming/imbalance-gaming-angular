System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/operator/share', "./api.service", "../directives/messages/messages.service", "../models/project-package-command"], function(exports_1, context_1) {
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
    var core_1, Observable_1, api_service_1, messages_service_1, project_package_command_1;
    var ProjectPackageCommandService;
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
            function (project_package_command_1_1) {
                project_package_command_1 = project_package_command_1_1;
            }],
        execute: function() {
            ProjectPackageCommandService = (function () {
                function ProjectPackageCommandService(_apiService, _messageService) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._messageService = _messageService;
                    this._packageCommand = new project_package_command_1.ProjectPackageCommand();
                    this.packageCommand$ = Observable_1.Observable.create(function (observer) { return _this._packageCommandObserver = observer; }).share();
                }
                ProjectPackageCommandService.prototype.create = function (packageCommandData) {
                    var packageCommand = new project_package_command_1.ProjectPackageCommand;
                    packageCommand.id = packageCommandData.id;
                    packageCommand.command = packageCommandData.command;
                    packageCommand.order = packageCommandData.order;
                    packageCommand.run_on = packageCommandData.run_on;
                    packageCommand.command_type = packageCommandData.command_type;
                    return packageCommand;
                };
                ProjectPackageCommandService.prototype.get = function () {
                    var _this = this;
                    return this._apiService.getPromiseWithAuth('projectPackageCommands')
                        .then(function (data) { return _this.set(_this.create(data)); }, function (error) {
                        _this._messageService.addMessage({
                            success: null,
                            error: error
                        });
                    });
                };
                ProjectPackageCommandService.prototype.set = function (packageCommand) {
                    this._packageCommand = packageCommand;
                    this._packageCommandObserver.next(this._packageCommand);
                };
                ProjectPackageCommandService.prototype.add = function (packageCommand) {
                    var _this = this;
                    return this._apiService.postPromiseWithAuth('projectPackageCommands', this.generateData(packageCommand)).then(function (data) {
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
                ProjectPackageCommandService.prototype.update = function (packageCommand) {
                    var _this = this;
                    return this._apiService.patchPromise('projectPackageCommands/' + packageCommand.id, this.generateData(packageCommand)).then(function (data) {
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
                ProjectPackageCommandService.prototype.delete = function (packageCommand) {
                    var _this = this;
                    return this._apiService.deletePromise('projectPackageCommands/' + packageCommand.id).then(function (data) {
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
                ProjectPackageCommandService.prototype.generateData = function (packageCommand) {
                    return {
                        command: packageCommand.command,
                        order: packageCommand.order,
                        run_on: packageCommand.run_on,
                        command_type: packageCommand.command_type,
                        project_package_id: packageCommand.project_package_id,
                    };
                };
                ProjectPackageCommandService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, messages_service_1.MessagesService])
                ], ProjectPackageCommandService);
                return ProjectPackageCommandService;
            }());
            exports_1("ProjectPackageCommandService", ProjectPackageCommandService);
        }
    }
});
//# sourceMappingURL=project-package-command.service.js.map