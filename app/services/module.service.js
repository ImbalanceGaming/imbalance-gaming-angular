System.register(['angular2/core', "rxjs/Observable", 'rxjs/add/operator/share', "../models/module", "./api.service", "../directives/messages/messages.service", "../directives/tables/table.service", "./table-data.service", "./module-section.service"], function(exports_1, context_1) {
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
    var core_1, Observable_1, module_1, api_service_1, messages_service_1, table_service_1, table_data_service_1, module_section_service_1;
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
            }],
        execute: function() {
            ModuleService = (function () {
                function ModuleService(_apiService, _messageService, _tableService, _tableDataService, _moduleSectionService) {
                    var _this = this;
                    this._apiService = _apiService;
                    this._messageService = _messageService;
                    this._tableService = _tableService;
                    this._tableDataService = _tableDataService;
                    this._moduleSectionService = _moduleSectionService;
                    this._modules = [];
                    this.modules$ = Observable_1.Observable.create(function (observer) { return _this._modulesObserver = observer; }).share();
                }
                ModuleService.prototype.create = function (moduleData) {
                    return new module_1.Module(moduleData.id, moduleData.key, moduleData.name, moduleData.description);
                };
                ModuleService.prototype.get = function (id) {
                    return Promise.resolve(this._modules).then(function (modules) { return modules.filter(function (module) { return module.id === id; })[0]; });
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
                ModuleService.prototype.set = function (modules) {
                    this._modules = modules;
                    this._modulesObserver.next(this._modules);
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
                ModuleService.prototype.buildModules = function (modulesData, buildTableData) {
                    var _this = this;
                    if (buildTableData === void 0) { buildTableData = false; }
                    this._modules = [];
                    var _loop_1 = function(key) {
                        var moduleInfo = void 0;
                        var moduleSectionsData = void 0;
                        if (modulesData.data.hasOwnProperty(key)) {
                            moduleInfo = modulesData.data[key].module;
                            moduleSectionsData = modulesData.data[key].module_sections;
                        }
                        var module = this_1.create(moduleInfo);
                        if (moduleSectionsData.length > 0) {
                            var moduleSections_1 = [];
                            moduleSections_1.forEach(function (sectionData) {
                                moduleSections_1.push(_this._moduleSectionService.create(sectionData));
                            });
                            module.sections = moduleSections_1;
                        }
                        this_1._modules.push(module);
                    };
                    var this_1 = this;
                    for (var key in modulesData.data) {
                        _loop_1(key);
                    }
                    this.set(this._modules);
                    if (buildTableData) {
                        this._tableDataService.getModuleTableData(this._modules, true, modulesData.paginator)
                            .then(function (table) { return _this._tableService.addTable(table); });
                    }
                };
                ModuleService.prototype.updateTable = function () {
                    var _this = this;
                    this._tableDataService.getModuleTableData(this._modules, false)
                        .then(function (table) { return _this._tableService.addTable(table); });
                };
                ModuleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [api_service_1.ApiService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService, module_section_service_1.ModuleSectionService])
                ], ModuleService);
                return ModuleService;
            }());
            exports_1("ModuleService", ModuleService);
        }
    }
});
//# sourceMappingURL=module.service.js.map