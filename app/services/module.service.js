System.register(['angular2/core', "rxjs/Observable", 'rxjs/add/operator/share', "../models/module", "./api.service", "../directives/messages/messages.service", "../directives/tables/table.service", "./table-data.service", "./module-section.service", "./permission.service"], function(exports_1, context_1) {
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
    var core_1, Observable_1, module_1, api_service_1, messages_service_1, table_service_1, table_data_service_1, module_section_service_1, permission_service_1;
    var ModuleService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (module_1_1) {
                module_1 = module_1_1;
            },
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
            function (module_section_service_1_1) {
                module_section_service_1 = module_section_service_1_1;
            },
            function (permission_service_1_1) {
                permission_service_1 = permission_service_1_1;
            }],
        execute: function() {
            ModuleService = (function () {
                function ModuleService(_apiService, _messageService, _tableService, _tableDataService, _moduleSectionService, _permissionService) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._messageService = _messageService;
                    this._tableService = _tableService;
                    this._tableDataService = _tableDataService;
                    this._moduleSectionService = _moduleSectionService;
                    this._permissionService = _permissionService;
                    this._modules = [];
                    this._module = new module_1.Module();
                    this.modules$ = Observable_1.Observable.create(function (observer) { return _this._modulesObserver = observer; }).share();
                    this.module$ = Observable_1.Observable.create(function (observer) { return _this._moduleObserver = observer; }).share();
                }
                ModuleService.prototype.firstCall = function () {
                    this._moduleObserver.next(this._module);
                };
                ModuleService.prototype.create = function (moduleData) {
                    return new module_1.Module(moduleData.id, moduleData.key, moduleData.name, moduleData.description);
                };
                ModuleService.prototype.get = function (id) {
                    return Promise.resolve(this._modules).then(function (modules) { return modules.filter(function (module) { return module.id === id; })[0]; });
                };
                ModuleService.prototype.getSection = function (name) {
                    return Promise.resolve(this._module).then(function (module) {
                        return module.sections.filter(function (section) { return section.name === name; })[0];
                    });
                };
                ModuleService.prototype.getModules = function (page, queryAPI, buildTableData) {
                    var _this = this;
                    if (page === void 0) { page = 1; }
                    if (queryAPI === void 0) { queryAPI = false; }
                    if (buildTableData === void 0) { buildTableData = false; }
                    if (this._modules.length === 0 || queryAPI) {
                        return this._apiService.getPromiseWithAuth('modules?page=' + page)
                            .then(function (data) { return _this.buildModules(data, buildTableData); }, function (error) {
                            _this._messageService.addMessage({
                                success: null,
                                error: error
                            });
                        });
                    }
                    else {
                        return Promise.resolve(this._modules).then(function (modules) {
                            _this.set(modules);
                            if (buildTableData) {
                                _this.updateTable();
                            }
                        });
                    }
                };
                ModuleService.prototype.getModule = function (moduleName) {
                    var _this = this;
                    return this._apiService.getPromiseWithAuth('getModule/' + moduleName)
                        .then(function (data) { return _this.buildModule(data, false); }, function (error) { return console.log(error); });
                };
                ModuleService.prototype.set = function (modules) {
                    this._modules = modules;
                    this._modulesObserver.next(this._modules);
                };
                ModuleService.prototype.setModule = function (module) {
                    this._module = module;
                    this._moduleObserver.next(this._module);
                };
                ModuleService.prototype.add = function (module) {
                    var _this = this;
                    this._apiService.postWithAuth('modules', this.generateData(module)).subscribe(function (data) {
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
                        _this.getModules(1, true, true).then(function () {
                            _this.getModules(_this._tableDataService.table.totalPages, true, true);
                        });
                    });
                };
                ModuleService.prototype.update = function (module) {
                    var _this = this;
                    this._apiService.patch('modules/' + module.id, this.generateData(module)).subscribe(function (data) {
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
                ModuleService.prototype.delete = function (module) {
                    var _this = this;
                    this._apiService.delete('modules/' + module.id).subscribe(function (data) {
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
                        _this.getModules(1, true, true).then(function () {
                            _this.getModules(_this._tableDataService.table.totalPages, true, true);
                        });
                    });
                };
                ModuleService.prototype.generateData = function (module) {
                    return {
                        'key': module.key,
                        'name': module.name,
                        'description': module.description,
                    };
                };
                ModuleService.prototype.setPermissions = function () {
                    var _this = this;
                    return this._permissionService.getUserAccessLevel(this._module).then(function (module) {
                        _this.setModule(module);
                    });
                };
                ModuleService.prototype.buildModules = function (modulesData, buildTableData) {
                    var _this = this;
                    if (buildTableData === void 0) { buildTableData = false; }
                    this._modules = [];
                    for (var key in modulesData.data) {
                        if (modulesData.data.hasOwnProperty(key)) {
                            this._modules.push(this.buildModule(modulesData.data[key]));
                        }
                    }
                    this.set(this._modules);
                    if (buildTableData) {
                        this._tableDataService.getModuleTableData(this._modules, true, modulesData.paginator)
                            .then(function (table) { return _this._tableService.addTable(table); });
                    }
                };
                ModuleService.prototype.buildModule = function (moduleData, forGroup) {
                    var _this = this;
                    if (forGroup === void 0) { forGroup = true; }
                    var moduleInfo;
                    var moduleSectionsData;
                    moduleInfo = moduleData.data.module;
                    moduleSectionsData = moduleData.data.module_sections;
                    var module = this.create(moduleInfo);
                    if (moduleSectionsData.length > 0) {
                        var moduleSections_1 = [];
                        moduleSectionsData.forEach(function (sectionData) {
                            moduleSections_1.push(_this._moduleSectionService.create(sectionData));
                        });
                        module.sections = moduleSections_1;
                    }
                    if (!forGroup) {
                        this.setModule(module);
                    }
                    return module;
                };
                ModuleService.prototype.updateTable = function () {
                    var _this = this;
                    this._tableDataService.getModuleTableData(this._modules, false)
                        .then(function (table) { return _this._tableService.addTable(table); });
                };
                ModuleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService, module_section_service_1.ModuleSectionService, permission_service_1.PermissionService])
                ], ModuleService);
                return ModuleService;
            }());
            exports_1("ModuleService", ModuleService);
        }
    }
});
//# sourceMappingURL=module.service.js.map