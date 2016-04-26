import {Component}                          from 'angular2/core';
import {ROUTER_DIRECTIVES}     from 'angular2/router';

import {TableDirective}     from "../../../directives/tables/table.directive";
import {MessagesDirective}  from "../../../directives/messages/messages.directive";
import {Permission}         from "../../../models/permission";
import {PermissionService}  from "../../../services/permission.service";

@Component({
    selector: 'permissions',
    templateUrl: 'app/components/userManagement/permissions/permissions.component.html',
    styleUrls: ['app/components/userManagement/permissions/permissions.component.css'],
    directives: [ROUTER_DIRECTIVES, TableDirective, MessagesDirective]
})

export class PermissionsComponent {

    title: string;
    active: boolean = true;

    permissions: Array<Permission> = [];
    permission: Permission = new Permission();

    constructor(private _permissionService: PermissionService) {
        this.title = 'Create new permission';
    }

    ngOnInit() {
        this._permissionService.permissions$.subscribe(permissions => this.permissions = permissions);
        this._permissionService.getPermissions(1, true, true);
    }

    onSubmit() {

        this._permissionService.add(this.permission);
        this.permission = new Permission();

        this.active = false;
        setTimeout(()=> this.active=true, 1);
    }

    pageChanged(event) {
        this._permissionService.getPermissions(event, true, true);
        return event;
    }

}

