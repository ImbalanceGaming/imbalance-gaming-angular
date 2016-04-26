import {Component}                          from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES}   from 'angular2/router';

import {FormButtonInterface}    from "../../../../directives/form-buttons/form-button.interface";
import {DynamicFormDirective}   from "../../../../directives/dynamic-form/normalForm/dynamic-form.directive";
import {FormDataService}        from "../../../../services/form-data.service";
import {MessagesDirective}      from "../../../../directives/messages/messages.directive";
import {DynamicModalFormDirective} from "../../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive";
import {GroupService}           from "../../../../services/group.service";
import {UserService}            from "../../../../services/user.service";
import {Permission}             from "../../../../models/permission";
import {ModuleSectionService}   from "../../../../services/module-section.service";
import {PermissionService}      from "../../../../services/permission.service";

@Component({
    selector: 'permission-detail',
    templateUrl: 'app/components/userManagement/permissions/permissionDetail/permission-detail.component.html',
    styleUrls: ['app/components/userManagement/permissions/permissionDetail/permission-detail.component.css'],
    directives: [DynamicFormDirective, MessagesDirective, ROUTER_DIRECTIVES, DynamicModalFormDirective]
})

export class PermissionDetailComponent {

    title       : string;
    permissions : Array<Permission> = [];
    permission  : Permission;
    formData    : Array<any> = [];
    formButtonData : Array<FormButtonInterface> = [];

    userModalFormData: Array<any> = [];
    userSearchReturn: Array<any> = [];

    groupModalFormData: Array<any> = [];
    groupSearchReturn: Array<any> = [];

    moduleSectionModalFormData: Array<any> = [];
    moduleSectionSearchReturn: Array<any> = [];

    constructor(
        private _routeParams: RouteParams,
        private _router: Router,
        private _formDataService: FormDataService,
        private _permissionService: PermissionService,
        private _userService:UserService,
        private _groupService: GroupService,
        private _moduleSectionService: ModuleSectionService
    ) {
        this.title = 'Permission Detail';
        this.permission = new Permission();

        this._formDataService.getAddUserData()
            .then(formData => this.userModalFormData = formData);

        this._formDataService.getAddGroupData()
            .then(formData => this.groupModalFormData = formData);

        this._formDataService.getAddModuleSectionData()
            .then(formData => this.moduleSectionModalFormData = formData);
    }

    ngOnInit() {

        this._permissionService.permissions$.subscribe(permissions => this.permissions = permissions);
        this.updateForm();

    }

    saveChanges(formData) {

        this.permission.name = formData.name;
        this.permission.description = formData.description;
        this.permission.view = formData.view;
        this.permission.add = formData.add;
        this.permission.edit = formData.edit;
        this.permission.delete = formData.delete;

        this._permissionService.update(this.permission);

    }

    cancelEdit() {
        this._router.navigate(['Permissions']);
    }

    deleteUser() {
        this._permissionService.delete(this.permission);
        this._router.navigate(['Permissions']);
    }

    onAddUser(formData) {
        //noinspection TypeScriptUnresolvedVariable
        this._permissionService.addUserToPermission(this.permission.id, formData.selectedSearchValue)
            .then(() => {
                this.updateForm();
            });
    }

    onUserSearch(searchValue: string) {
        this._userService.findUsers(searchValue)
            .then(data => this.userSearchReturn = data);
    }

    onRemoveUser(userId: number) {
        this._permissionService.removeUserFromPermission(this.permission.id, userId)
            .then(() => {
                this.updateForm();
            });
    }

    onAddGroup(formData) {
        //noinspection TypeScriptUnresolvedVariable
        this._permissionService.addGroupToPermission(this.permission.id, formData.selectedSearchValue)
            .then(() => {
                this.updateForm();
            });
    }

    onGroupSearch(searchValue: string) {
        this._groupService.findGroups(searchValue)
            .then(data => this.groupSearchReturn = data);
    }

    onRemoveGroup(groupId: number) {
        this._permissionService.removeGroupFromPermission(this.permission.id, groupId)
            .then(() => {
                this.updateForm();
            });
    }

    onAddModuleSection(formData) {
        //noinspection TypeScriptUnresolvedVariable
        this._permissionService.addModuleSectionToPermission(this.permission.id, formData.selectedSearchValue)
            .then(() => {
                this.updateForm();
            });
    }

    onModuleSectionSearch(searchValue: string) {
        this._moduleSectionService.findModuleSections(searchValue)
            .then(data => this.moduleSectionSearchReturn = data);
    }

    onRemoveModuleSection(moduleSectionId: number) {
        this._permissionService.removeModuleSectionFromPermission(this.permission.id, moduleSectionId)
            .then(() => {
                this.updateForm();
            });
    }

    private updateForm() {
        let id = +this._routeParams.get('id');
        let page = +this._routeParams.get('page');
        this._permissionService.getPermissions(page, true).then(() => {
            this._permissionService.get(id).then(permission => {
                this.permission = permission;
                this._formDataService.getPermissionDetailData(permission)
                    .then(formData => this.formData = formData);
                this._formDataService.getDefaultButtons()
                    .then(formButtonData => this.formButtonData = formButtonData);

                this._formDataService.getAddUserData()
                    .then(formData => this.userModalFormData = formData);
                this._formDataService.getAddGroupData()
                    .then(formData => this.groupModalFormData = formData);
                this._formDataService.getAddModuleSectionData()
                    .then(formData => this.moduleSectionModalFormData = formData);
            });
        });
    }


}
