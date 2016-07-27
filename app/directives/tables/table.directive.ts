import {Component, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {PaginationControlsCmp, PaginatePipe, PaginationService} from 'ng2-pagination';

import {Table} from "./interfaces/table.interface";
import {TableService} from "./table.service";

@Component({
    selector: 'table-controls',
    templateUrl: 'app/directives/tables/table.directive.html',
    styleUrls: ['app/directives/tables/table.directive.css'],
    directives: [PaginationControlsCmp, ROUTER_DIRECTIVES],
    providers: [PaginationService],
    pipes: [PaginatePipe]
})

export class TableDirective {

    @Output() pageChange: EventEmitter<number> = new EventEmitter();
    @Output() linkClick: EventEmitter<number> = new EventEmitter();

    tableData : Table = {
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

    constructor(private _tableService: TableService) {}

    ngOnInit() {
        this._tableService.table$.subscribe(updatedPagination => this.tableData = updatedPagination);
    }

    pageChanged(page: number) {
        this.pageChange.emit(page);
    }

    linkClicked(id: number) {
        this.linkClick.emit(id);
    }

}
