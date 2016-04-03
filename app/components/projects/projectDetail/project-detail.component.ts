import {Component}                          from 'angular2/core';
import {CanActivate, Router, RouteParams, ROUTER_DIRECTIVES}   from 'angular2/router';

import {authCheck}            from "../../../common/auth-check"
import {ComponentInstruction} from "../../../../node_modules/angular2/src/router/instruction";

import {FormButtonInterface}    from "../../../directives/form-buttons/form-button.interface";
import {DynamicFormDirective}   from "../../../directives/dynamic-form/normalForm/dynamic-form.directive";
import {FormDataService}        from "../../../services/form-data.service";
import {MessagesDirective}      from "../../../directives/messages/messages.directive";
import {Project}                from "../../../models/project";
import {ProjectService}         from "../../../services/project.service";
import {UserService} from "../../../services/user.service";

@Component({
    selector: 'group-detail',
    templateUrl: 'app/components/projects/projectDetail/project-detail.component.html',
    styleUrls: ['app/components/projects/projectDetail/project-detail.component.css'],
    directives: [DynamicFormDirective, MessagesDirective, ROUTER_DIRECTIVES]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck(next, previous);
})

export class ProjectDetailComponent {

    title           : string;
    projects        : Array<Project> = [];
    project         : Project;
    formData        : Array<any> = [];
    formButtonData  : Array<FormButtonInterface> = [];
    public searchReturn: Array<any>;

    constructor(
        private _projectService: ProjectService,
        private _routeParams: RouteParams,
        private _router: Router,
        private _formDataService: FormDataService,
        private _userService: UserService
    ) {
        this.title = 'Project Detail';
        this.project = new Project();
    }

    ngOnInit() {

        this._projectService.projects$.subscribe(projects => this.projects = projects);
        let id = +this._routeParams.get('id');
        let page = +this._routeParams.get('page');
        this._projectService.getProjects(page, true).then(() => {
            this._projectService.get(id).then(project => {
                this.project = project;
                this._formDataService.getProjectDetailData(project)
                    .then(formData => this.formData = formData);
                this._formDataService.getDefaultButtons()
                    .then(formButtonData => this.formButtonData = formButtonData);
            });
        });

    }

    saveChanges(formData) {

        this.project.description = formData.description;
        this.project.url = formData.url;
        this.project.git_url = formData.git_url;
        this.project.status = formData.status;
        this.project.lead_user = null;
        //noinspection TypeScriptUnresolvedVariable
        this.project.lead_user_id = formData.selectedSearchValue;

        this._projectService.update(this.project);

        let page = +this._routeParams.get('page');
        this._projectService.getProjects(page, true, true);

    }

    cancelEdit() {
        this._router.navigate(['/Projects']);
    }

    deleteProject() {
        this._projectService.delete(this.project);
        this._router.navigate(['/Projects']);
    }

    onSearch(searchValue: string) {
        this._userService.findUsers(searchValue)
            .then(data => this.searchReturn = data);
    }

}
