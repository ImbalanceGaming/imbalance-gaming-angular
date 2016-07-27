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
var router_1 = require("@angular/router");
var ng2_pagination_1 = require('ng2-pagination');
var table_service_1 = require("./table.service");
var TableDirective = (function () {
    function TableDirective(_tableService) {
        this._tableService = _tableService;
        this.pageChange = new core_1.EventEmitter();
        this.linkClick = new core_1.EventEmitter();
        this.tableData = {
            headers: [],
            body: {
                rows: []
            },
            detailURL: '',
            paginationConfig: {
                itemsPerPage: 1,
                currentPage: 1
            },
            totalPages: 1
        };
    }
    TableDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._tableService.table$.subscribe(function (updatedPagination) { return _this.tableData = updatedPagination; });
    };
    TableDirective.prototype.pageChanged = function (page) {
        this.pageChange.emit(page);
    };
    TableDirective.prototype.linkClicked = function (id) {
        this.linkClick.emit(id);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableDirective.prototype, "pageChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableDirective.prototype, "linkClick", void 0);
    TableDirective = __decorate([
        core_1.Component({
            selector: 'table-controls',
            templateUrl: 'app/directives/tables/table.directive.html',
            styleUrls: ['app/directives/tables/table.directive.css'],
            directives: [ng2_pagination_1.PaginationControlsCmp, router_1.ROUTER_DIRECTIVES],
            providers: [ng2_pagination_1.PaginationService],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [table_service_1.TableService])
    ], TableDirective);
    return TableDirective;
}());
exports.TableDirective = TableDirective;
//# sourceMappingURL=table.directive.js.map