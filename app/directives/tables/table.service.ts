import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer}   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {Table}       from "./interfaces/table.interface";

@Injectable()
export class TableService {

    table$:Observable<Table>;
    private _tableObserver: Observer<Table>;
    private _table: Table = {
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

    constructor() {
        this.table$ = Observable.create(observer => this._tableObserver = observer).share();
    }

    addTable(tableData: Table) {

        if (this._tableObserver == undefined) {
            this.table$ = Observable.create(observer => this._tableObserver = observer).share();
        }

        this._table = tableData;
        this._tableObserver.next(this._table);

    }

}