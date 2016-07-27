import {Component}                          from '@angular/core';
import {Router, ROUTER_DIRECTIVES, ActivatedRoute}   from '@angular/router';

import {FormButtonInterface}    from "../../../../directives/form-buttons/form-button.interface";
import {DynamicFormDirective}   from "../../../../directives/dynamic-form/normalForm/dynamic-form.directive";
import {FormDataService}        from "../../../../services/form-data.service";
import {MessagesDirective}      from "../../../../directives/messages/messages.directive";
import {Group}                  from "../../../../models/group";
import {GroupService}           from "../../../../services/group.service";
import {DynamicModalFormDirective} from "../../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive";
import {UserService} from "../../../../services/user.service";
import {ProjectService} from "../../../../services/project.service";

@Component({
    selector: 'group-detail',
    templateUrl: 'app/components/userManagement/groups/groupDetail/group-detail.component.html',
    styleUrls: ['app/components/userManagement/groups/groupDetail/group-detail.component.css'],
    directives: [DynamicFormDirective, MessagesDirective, ROUTER_DIRECTIVES, DynamicModalFormDirective]
})

export class GroupDetailComponent {

    title       : string;
    groups      : Array<Group> = [];
    group       : Group;
    formData    : Array<any> = [];
    formButtonData : Array<FormButtonInterface> = [];

    userModalFormData: Array<any> = [];
    userSearchReturn: Array<any> = [];

    projectModalFormData: Array<any> = [];
    projectSearchReturn: Array<any> = [];

    private sub: any;

    constructor(
        private _groupService: GroupService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _formDataService: FormDataService,
        private _userService:UserService,
        private _projectService: ProjectService
    ) {
        this.title = 'Group Detail';
        this.group = new Group();

        this._formDataService.getAddUserData()
            .then(formData => this.userModalFormData = formData);

        this._formDataService.getAddProjectData()
            .then(formData => this.projectModalFormData = formData);
    }

    ngOnInit() {

        this._groupService.groups$.subscribe(groups => this.groups = groups);
        this.updateForm();

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    saveChanges(formData) {

        this.group.name = formData.name;
        this.group.description = formData.description;

        this._groupService.update(this.group);

    }

    cancelEdit() {
        this._router.navigate(['Groups']);
    }

    deleteUser() {
        this._groupService.delete(this.group);
        this._router.navigate(['Groups']);
    }

    onAddUser(formData) {
        //noinspection TypeScriptUnresolvedVariable
        this._groupService.addUserToGroup(this.group.id, formData.selectedSearchValue)
            .then(() => {
                this.updateForm();
            });
    }

    onUserSearch(searchValue: string) {
        this._userService.findUsers(searchValue)
            .then(data => this.userSearchReturn = data);
    }

    onRemoveUser(userId: number) {
        this._groupService.removeUserFromGroup(this.group.id, userId)
            .then(() => {
                this.updateForm();
            });
    }

    onAddProject(formData) {
        //noinspection TypeScriptUnresolvedVariable
        this._groupService.addProjectToGroup(this.group.id, formData.selectedSearchValue)
            .then(() => {
                this.updateForm();
            });
    }

    onProjectSearch(searchValue: string) {
        this._projectService.findProjects(searchValue)
            .then(data => this.projectSearchReturn = data);
    }

    onRemoveProject(projectId: number) {
        this._groupService.removeProjectFromGroup(this.group.id, projectId)
            .then(() => {
                this.updateForm();
            });
    }

    private updateForm() {

        this.sub = this._route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            let page = +params['page'];

            this._groupService.getGroups(page, true).then(() => {
                this._groupService.get(id).then(group => {
                    this.group = group;
                    this._formDataService.getGroupDetailData(group)
                        .then(formData => this.formData = formData);
                    this._formDataService.getDefaultButtons()
                        .then(formButtonData => this.formButtonData = formButtonData);
                });
            });
        });

    }


}