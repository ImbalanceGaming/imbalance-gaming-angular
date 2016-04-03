import {IPaginationInstance} from "ng2-pagination/index";

import {TableHeader} from "./table-header.interface";
import {TableBody} from "./table-body.interface";

export interface Table {
    
    headers: Array<TableHeader>;
    body: TableBody;
    detailURL: string;
    paginationConfig: IPaginationInstance;
    totalPages: number;

}
