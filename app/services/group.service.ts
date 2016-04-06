import {Injectable}                 from 'angular2/core';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {ApiService}                 from "./api.service";
import {UserService}                from "./user.service";

import {User}                       from '../models/user';
import {Group}                      from "../models/group";
import {ServiceInterface}           from "../interfaces/service.interface";
import {MessagesService}            from "../directives/messages/messages.service";
import {TableService}               from "../directives/tables/table.service";
import {TableDataService}           from "./table-data.service";
import {ProjectService}             from "./project.service";
import {Project}                    from "../models/project";

@Injectable()
export class GroupService implements ServiceInterface {

    groups$ : Observable<Array<Group>>;

    private _groupsObserver : Observer<Array<Group>>;

    private _groups : Array<Group> = [];

    constructor(
        private _apiService:ApiService,
        private _userService:UserService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService,
        private _projectService: ProjectService
    ) {
        this.groups$ = Observable.create(observer => this._groupsObserver = observer).share();
    }

    create(groupData) : Group {

        return new Group(
            groupData.id,
            groupData.name,
            groupData.description
        );

    }

    get(id: number) : Promise {

        return Promise.resolve(this._groups).then(
            groups => groups.filter(group => group.id === id)[0]
        );

    }

    getGroups(page: number = 1, queryAPI:boolean = false, buildTableData:boolean = false) : Promise {

        if (this._groups.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('groups?page='+page)
                .then(
                    data => this.buildGroups(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._groups).then(groups => {
                this.set(groups);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }


    }

    set(groups: Array<Group>) {

        this._groups = groups;
        this._groupsObserver.next(this._groups);

    }

    add(group: Group) {

        this._apiService.postWithAuth('groups', this.generateData(group)).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            },
            () => {
                this.getGroups(1, true, true).then(() => {
                    this.getGroups(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    update(group: Group) {

        this._apiService.patch('groups/'+group.id, this.generateData(group)).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            }
        );

    }
    
    delete(group: Group) {

        this._apiService.delete('groups/'+group.id).subscribe(
            data => {
                this._messageService.addMessage({
                    success: data.success.message,
                    error: null
                })
            },
            error => {
                this._messageService.addMessage({
                    success: null,
                    error: error.message
                })
            },
            () => {
                this.getGroups(1, true, true).then(() => {
                    this.getGroups(this._tableDataService.table.totalPages, true, true);
                });
            }
        );
        
    }

    generateData(group: Group) : any {

        let userIds : Array<number> = [];
        let projectIds : Array<number> = [];

        if (group.users.length > 0) {
            group.users.forEach(user => userIds.push(user.id));
        }

        if (group.projects.length > 0) {
            group.projects.forEach(project => projectIds.push(project.id));
        }

        return {
            name: group.name,
            description: group.description,
            users: userIds,
            projects: projectIds
        };

    }

    findGroups(searchTerm: string) {

        return this._apiService.getPromiseWithAuth('findGroups/'+searchTerm)
            .then(
                data => {
                    let groupData = [];
                    data.data.forEach(group => {
                        groupData.push({
                            id: group.id,
                            name: group.name
                        });
                    });
                    return groupData;
                },
                error => {
                    return [];
                }
            );

    }

    addUserToGroup(groupId: number, userId: number) {

        return this._apiService.patchPromise('addUserToGroup/'+groupId, {user_id: userId})
            .then(
                data => {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    })
                },
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error.message
                    })
                }
            );

    }

    removeUserFromGroup(groupId: number, userId: number) {

        return this._apiService.patchPromise('removeUserFromGroup/'+groupId, {user_id: userId})
            .then(
                data => {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    })
                },
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error.message
                    })
                }
            );

    }

    addProjectToGroup(groupId: number, projectId: number) {

        return this._apiService.patchPromise('addProjectToGroup/'+groupId, {project_id: projectId})
            .then(
                data => {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    })
                },
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error.message
                    })
                }
            );

    }

    removeProjectFromGroup(groupId: number, projectId: number) {

        return this._apiService.patchPromise('removeProjectFromGroup/'+groupId, {project_id: projectId})
            .then(
                data => {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    })
                },
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error.message
                    })
                }
            );

    }

    /**
     * 
     * @param {Object[]} groupsData
     * @param {boolean} buildTableData
     * @param {Object[]} groupsData.data
     * @param {Object} groupsData.data.group
     * @param {Object[]} groupsData.data.users
     * @param {Object} groupsData.paginator
     * @param {Object} groupsData.paginator.per_page
     * @param {Object} groupsData.paginator.last_page
     * @param {Object} groupsData.paginator.current_page
     */
    private buildGroups(groupsData: any, buildTableData = false) {

        this._groups = [];

        for(let key in groupsData.data) {
            let groupInfo;
            let groupUsers;
            let groupProjects;

            if (groupsData.data.hasOwnProperty(key)) {
                groupInfo = groupsData.data[key].group;
                groupUsers = groupsData.data[key].users;
                groupProjects = groupsData.data[key].projects;
            }

            let group = this.create(groupInfo);

            if (groupUsers.length > 0) {
                let users: Array<User> = [];
                groupUsers.forEach(userData => {
                    users.push(this._userService.create(userData));
                });
                group.users = users;
            }

            if (groupProjects.length > 0) {
                let project: Array<Project> = [];
                groupProjects.forEach(projectData => {
                    project.push(this._projectService.create(projectData));
                });
                group.projects = project;
            }

            this._groups.push(group);
        }

        this.set(this._groups);

        if (buildTableData) {
            this._tableDataService.getGroupsTableData(this._groups, true, groupsData.paginator)
                .then(table => this._tableService.addTable(table));
        }

    }

    private updateTable() {
        this._tableDataService.getGroupsTableData(this._groups, false)
            .then(table => this._tableService.addTable(table));
    }

}