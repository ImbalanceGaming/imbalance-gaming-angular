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
var module_1 = require("../models/module");
var api_service_1 = require("./api.service");
var messages_service_1 = require("../directives/messages/messages.service");
var table_service_1 = require("../directives/tables/table.service");
var table_data_service_1 = require("./table-data.service");
var module_section_1 = require("../models/module-section");
var ModuleSectionService = (function () {
    function ModuleSectionService(_apiService, _messageService, _tableService, _tableDataService) {
        var _this = this;
        this._apiService = _apiService;
        this._messageService = _messageService;
        this._tableService = _tableService;
        this._tableDataService = _tableDataService;
        this._moduleSections = [];
        this.moduleSections$ = Observable_1.Observable.create(function (observer) { return _this._moduleSectionsObserver = observer; }).share();
    }
    ModuleSectionService.prototype.create = function (moduleSectionData) {
        return new module_section_1.ModuleSection(moduleSectionData.id, moduleSectionData.name, moduleSectionData.description);
    };
    ModuleSectionService.prototype.get = function (id) {
        return Promise.resolve(this._moduleSections).then(function (modules) { return modules.filter(function (moduleSection) { return moduleSection.id === id; })[0]; });
    };
    ModuleSectionService.prototype.getModuleSections = function (page, queryAPI, buildTableData) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (queryAPI === void 0) { queryAPI = false; }
        if (buildTableData === void 0) { buildTableData = false; }
        if (this._moduleSections.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('moduleSections?page=' + page)
                .then(function (data) { return _this.buildModuleSections(data, buildTableData); }, function (error) {
                _this._messageService.addMessage({
                    success: null,
                    error: error
                });
            });
        }
        else {
            return Promise.resolve(this._moduleSections).then(function (moduleSections) {
                _this.set(moduleSections);
                if (buildTableData) {
                    _this.updateTable();
                }
            });
        }
    };
    ModuleSectionService.prototype.set = function (moduleSections) {
        this._moduleSections = moduleSections;
        this._moduleSectionsObserver.next(this._moduleSections);
    };
    ModuleSectionService.prototype.add = function (moduleSection) {
        var _this = this;
        this._apiService.postWithAuth('moduleSections', this.generateData(moduleSection)).subscribe(function (data) {
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
            _this.getModuleSections(1, true, true).then(function () {
                _this.getModuleSections(_this._tableDataService.table.totalPages, true, true);
            });
        });
    };
    ModuleSectionService.prototype.update = function (moduleSection) {
        var _this = this;
        this._apiService.patch('moduleSections/' + moduleSection.id, this.generateData(moduleSection)).subscribe(function (data) {
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
    ModuleSectionService.prototype.delete = function (moduleSection) {
        var _this = this;
        this._apiService.delete('moduleSections/' + moduleSection.id).subscribe(function (data) {
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
            _this.getModuleSections(1, true, true).then(function () {
                _this.getModuleSections(_this._tableDataService.table.totalPages, true, true);
            });
        });
    };
    ModuleSectionService.prototype.findModuleSections = function (searchTerm) {
        return this._apiService.getPromiseWithAuth('findModuleSections/' + searchTerm)
            .then(function (data) {
            var moduleSectionsData = [];
            data.data.forEach(function (module_section) {
                moduleSectionsData.push({
                    id: module_section.id,
                    name: module_section.name
                });
            });
            return moduleSectionsData;
        }, function (error) {
            return [];
        });
    };
    ModuleSectionService.prototype.generateData = function (moduleSection) {
        return {
            'name': moduleSection.name,
            'description': moduleSection.description,
        };
    };
    ModuleSectionService.prototype.buildModuleSections = function (moduleSectionsData, buildTableData) {
        var _this = this;
        if (buildTableData === void 0) { buildTableData = false; }
        this._moduleSections = [];
        for (var key in moduleSectionsData.data) {
            var moduleSectionInfo = void 0;
            var moduleInfo = void 0;
            if (moduleSectionsData.data.hasOwnProperty(key)) {
                //noinspection TypeScriptUnresolvedVariable
                moduleSectionInfo = moduleSectionsData.data[key].module_section;
                moduleInfo = moduleSectionsData.data[key].module;
            }
            var moduleSection = this.create(moduleInfo);
            moduleSection.module = new module_1.Module(moduleInfo.id, moduleInfo.key, moduleInfo.name, moduleInfo.description);
            this._moduleSections.push(moduleSection);
        }
        this.set(this._moduleSections);
        if (buildTableData) {
            this._tableDataService.getModuleSectionTableData(this._moduleSections, true, moduleSectionsData.paginator)
                .then(function (table) { return _this._tableService.addTable(table); });
        }
    };
    ModuleSectionService.prototype.updateTable = function () {
        var _this = this;
        this._tableDataService.getModuleSectionTableData(this._moduleSections, false)
            .then(function (table) { return _this._tableService.addTable(table); });
    };
    ModuleSectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService, messages_service_1.MessagesService, table_service_1.TableService, table_data_service_1.TableDataService])
    ], ModuleSectionService);
    return ModuleSectionService;
}());
exports.ModuleSectionService = ModuleSectionService;
//# sourceMappingURL=module-section.service.js.map