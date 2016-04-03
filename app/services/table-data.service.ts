import {Injectable} from 'angular2/core';

import {Table} from "../directives/tables/interfaces/table.interface";
import {User} from "../models/user";
import {TableHeader} from "../directives/tables/interfaces/table-header.interface";
import {TableRow} from "../directives/tables/interfaces/table-row.interface";
import {TableCell} from "../directives/tables/interfaces/table-cell.interface";
import {Group} from "../models/group";
import {Project} from "../models/project";

@Injectable()
export class TableDataService {

    table: Table = {
        headers: [],
        body: {
            rows: []
        },
        detailURL: '',
        paginationConfig: {
            itemsPerPage: 10,
            currentPage: 1
        },
        totalPages: 1
    };

    getUsersTableData(
        users: Array<User>,
        updateTableConfig:boolean = true,
        paginatorData?: any
    ) : Promise {

        return Promise.resolve(users).then(users => {
            if (updateTableConfig) {
                this.updateTableConfig(paginatorData, 'users-paginator', '\UserDetail');
            }

            this.table.body.rows = [];

            this.table.headers = [
                <TableHeader>{value: 'Full Name', show: true},
                <TableHeader>{value: 'Role', show: true},
                <TableHeader>{value: 'Username', show: true},
                <TableHeader>{value: 'Email', show: true},
                <TableHeader>{value: 'Last Session', show: true},
                <TableHeader>{value: 'Deactivate', show: false}
            ];

            users.forEach(function (user:User) {
                let activeStatusText = (user.active == true)?'deactivate':'activate';
                this.table.body.rows.push(<TableRow>{
                    rowId: user.id,
                    cells: [
                        <TableCell>{value: user.forename + " " + user.surname, detailCell: true, clickEvent: false},
                        <TableCell>{value: user.role, detailCell: false, clickEvent: false},
                        <TableCell>{value: user.username, detailCell: false, clickEvent: false},
                        <TableCell>{value: user.email, detailCell: false, clickEvent: false},
                        <TableCell>{value: user.last_login, detailCell: false, clickEvent: false},
                        <TableCell>{value: activeStatusText, detailCell: false, clickEvent: true},
                    ]
                })
            }, this);

            return this.table;
        });

    }

    getGroupsTableData(
        groups: Array<Group>,
        updateTableConfig:boolean = true,
        paginatorData?: any
    ) : Promise {

        return Promise.resolve(groups).then(groups => {

            if (updateTableConfig) {
                this.updateTableConfig(paginatorData, 'groups-paginator', '\GroupDetail');
            }

            this.table.body.rows = [];

            this.table.headers = [
                <TableHeader>{value: 'Name', show: true},
                <TableHeader>{value: 'Description', show: true}
            ];

            groups.forEach(function (group:Group) {
                this.table.body.rows.push(<TableRow>{
                    rowId: group.id,
                    cells: [
                        <TableCell>{value: group.name, detailCell: true, clickEvent: false},
                        <TableCell>{value: group.description, detailCell: false, clickEvent: false},
                    ]
                })
            }, this);

            return this.table;
        });

    }

    getProjectsTableData(
        projects: Array<Project>,
        updateTableConfig:boolean = true,
        paginatorData?: any
    ) {
        return Promise.resolve(projects).then(projects => {

            if (updateTableConfig) {
                this.updateTableConfig(paginatorData, 'projects-paginator', '\ProjectDetail');
            }

            this.table.body.rows = [];

            this.table.headers = [
                <TableHeader>{value: 'Key', show: true},
                <TableHeader>{value: 'Name', show: true},
                <TableHeader>{value: 'Description', show: true},
                <TableHeader>{value: 'Project Lead', show: true},
                <TableHeader>{value: 'Project URL', show: true},
                <TableHeader>{value: 'Git URL', show: true},
                <TableHeader>{value: 'Status', show: true},
                <TableHeader>{value: 'Deploy', show: false},
            ];

            projects.forEach(function (project:Project) {
                this.table.body.rows.push(<TableRow>{
                    rowId: project.id,
                    cells: [
                        <TableCell>{value: project.key, detailCell: true, clickEvent: false},
                        <TableCell>{value: project.name, detailCell: false, clickEvent: false},
                        <TableCell>{value: project.description, detailCell: false, clickEvent: false},
                        <TableCell>{
                            value: project.lead_user?project.lead_user.forename + ' ' + project.lead_user.surname:'None',
                            detailCell: false, clickEvent: false},
                        <TableCell>{value: project.url?project.url:'N/A', detailCell: false, clickEvent: false},
                        <TableCell>{value: project.git_url, detailCell: false, clickEvent: false},
                        <TableCell>{value: project.status, detailCell: false, clickEvent: false},
                        <TableCell>{value: 'deploy', detailCell: false, clickEvent: true},
                    ]
                })
            }, this);

            return this.table;
        });
    }

    private updateTableConfig(paginatorData: any, id: string, detailURL: string) {

        this.table.paginationConfig.itemsPerPage = paginatorData.per_page;
        this.table.paginationConfig.totalItems = paginatorData.per_page * paginatorData.last_page;
        this.table.paginationConfig.currentPage = paginatorData.current_page;
        this.table.paginationConfig.id = id;
        this.table.totalPages = paginatorData.last_page;

        this.table.detailURL = detailURL;

    }

}
