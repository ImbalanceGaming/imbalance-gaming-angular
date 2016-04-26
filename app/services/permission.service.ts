import {Injectable}         from 'angular2/core';
import {Observer}           from "rxjs/Observer";
import {Observable}         from "rxjs/Observable";
import 'rxjs/add/operator/share';

import {ServiceInterface}   from "../interfaces/service.interface";
import {ApiService}         from "./api.service";
import {MessagesService}    from "../directives/messages/messages.service";
import {TableService}       from "../directives/tables/table.service";
import {TableDataService}   from "./table-data.service";
import {GroupService} from "./group.service";
import {UserService} from "./user.service";
import {ModuleSectionService} from "./module-section.service";
import {Permission} from "../models/permission";
import {User} from "../models/user";
import {Group} from "../models/group";
import {ModuleSection} from "../models/module-section";
import {Module} from "../models/module";

@Injectable()
export class PermissionService implements ServiceInterface {

    permissions$ : Observable<Array<Permission>>;
    private _permissionsObserver : Observer<Array<Permission>>;
    private _permissions : Array<Permission> = [];

    private _user: User;

    constructor(
        private _apiService:ApiService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService,
        private _groupService:GroupService,
        private _userService:UserService,
        private _moduleSectionService:ModuleSectionService
    ) {
        this.permissions$ = Observable.create(observer => this._permissionsObserver = observer).share();
        this._userService.user$.subscribe(user => this._user = user);
    }

    create(permissionData) : Permission {

        return new Permission(
            permissionData.id,
            permissionData.name,
            permissionData.description,
            permissionData.view,
            permissionData.add,
            permissionData.edit,
            permissionData.delete
        );

    }

    get(id:number) {

        return Promise.resolve(this._permissions).then(
            permissions => permissions.filter(permission => permission.id === id)[0]
        );

    }

    getPermissions(page: number = 1, queryAPI:boolean = false, buildTableData:boolean = false) : Promise {

        if (this._permissions.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('permissions?page='+page)
                .then(
                    data => this.buildPermissions(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._permissions).then(permissions => {
                this.set(permissions);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }


    }

    set(permissions: Array<Permission>) {

        this._permissions = permissions;
        this._permissionsObserver.next(this._permissions);

    }

    add(permission: Permission) {

        this._apiService.postWithAuth('permissions', this.generateData(permission)).subscribe(
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
                this.getPermissions(1, true, true).then(() => {
                    this.getPermissions(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    update(permission: Permission) {

        this._apiService.patch('permissions/'+permission.id, this.generateData(permission)).subscribe(
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

    delete(permission: Permission) {

        this._apiService.delete('permissions/'+permission.id).subscribe(
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
                this.getPermissions(1, true, true).then(() => {
                    this.getPermissions(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    generateData(permission: Permission) {

        return {
            'name': permission.name,
            'description': permission.description,
            'view': permission.view,
            'add': permission.add,
            'edit': permission.edit,
            'delete': permission.delete
        }

    }

    addUserToPermission(permissionId: number, userId: number) {

        return this._apiService.patchPromise('addUserToPermission/'+permissionId, {user_id: userId})
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

    removeUserFromPermission(permissionId: number, userId: number) {

        return this._apiService.patchPromise('removeUserFromPermission/'+permissionId, {user_id: userId})
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

    addGroupToPermission(permissionId: number, groupId: number) {

        return this._apiService.patchPromise('addGroupToPermission/'+permissionId, {group_id: groupId})
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

    removeGroupFromPermission(permissionId: number, groupId: number) {

        return this._apiService.patchPromise('removeGroupFromPermission/'+permissionId, {group_id: groupId})
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

    addModuleSectionToPermission(permissionId: number, moduleSectionId: number) {

        return this._apiService.patchPromise('addModuleSectionToPermission/'+permissionId, {module_section_id: moduleSectionId})
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

    removeModuleSectionFromPermission(permissionId: number, moduleSectionId: number) {

        return this._apiService.patchPromise('removeSectionFromPermission/'+permissionId, {module_section_id: moduleSectionId})
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

    getUserAccessLevel(module: Module) : Promise {

        return this._userService.getUserWithPermissions().then(userPermissions => {
            userPermissions.some(permission => {
                let permissionObject = this.create(permission);
                if (permissionObject.name == 'Admin Access') {
                    module.permission = permissionObject;
                    module.sections.forEach((section: ModuleSection, index: number) => {
                        module.sections[index].permission = permissionObject;
                    }, this);
                } else {

                }
            }, this);
            return module;
        });

    }

    private buildPermissions(permissionsData: any, buildTableData = false) {

        this._permissions = [];

        for(let key in permissionsData.data) {
            let permissionInfo;
            let usersData;
            let groupsData;
            let moduleSectionsData;

            if (permissionsData.data.hasOwnProperty(key)) {
                //noinspection TypeScriptUnresolvedVariable
                permissionInfo = permissionsData.data[key].permission;
                usersData = permissionsData.data[key].users;
                groupsData = permissionsData.data[key].groups;
                moduleSectionsData = permissionsData.data[key].module_sections;
            }

            let permission = this.create(permissionInfo);

            if (usersData.length > 0) {
                let users: Array<User> = [];
                usersData.forEach(userData => {
                    users.push(this._userService.create(userData));
                });
                permission.users = users;
            }

            if (groupsData.length > 0) {
                let groups: Array<Group> = [];
                groupsData.forEach(groupData => {
                    groups.push(this._groupService.create(groupData));
                });
                permission.groups = groups;
            }

            if (moduleSectionsData.length > 0) {
                let moduleSection: Array<ModuleSection> = [];
                moduleSectionsData.forEach(moduleSectionsData => {
                    moduleSection.push(this._moduleSectionService.create(moduleSectionsData));
                });
                permission.module_sections = moduleSection;
            }

            this._permissions.push(permission);
        }

        this.set(this._permissions);

        if (buildTableData) {
            this._tableDataService.getPermissionTableData(this._permissions, true, permissionsData.paginator)
                .then(table => this._tableService.addTable(table));
        }

    }

    private updateTable() {
        this._tableDataService.getPermissionTableData(this._permissions, false)
            .then(table => this._tableService.addTable(table));
    }

}

