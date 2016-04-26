import {Component}      from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, CanActivate, RouterOutlet, Router} from 'angular2/router';

import {authCheck}              from "../../common/auth-check"
import {ComponentInstruction}   from "../../../node_modules/angular2/src/router/instruction";

import {UserService}        from '../../services/user.service';
import {ProjectsComponent} from "./allProjects/projects.component";
import {ProjectDetailComponent} from "./projectDetail/project-detail.component";
import {DynamicModalFormDirective} from "../../directives/dynamic-form/modalForm/dynamic-modal-form.directive";
import {FormDataService} from "../../services/form-data.service";
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {AuthService} from "../../services/auth.service";
import {PackageDetailComponent} from "./packageDetail/package-detail.component";
import {ProjectPackageService} from "../../services/project-package.service";

@Component({
    selector: 'user-management',
    templateUrl: 'app/components/projects/project-router.component.html',
    styleUrls: ['app/components/projects/project-router.component.css'],
    directives: [RouterOutlet, ROUTER_DIRECTIVES, DynamicModalFormDirective],
    providers: [ProjectPackageService]
})

@RouteConfig([
    {path: '/allProjects', name: 'AllProjects', component: ProjectsComponent, useAsDefault: true},
    {path: '/projectDetail/:id', name: 'ProjectDetail', component: ProjectDetailComponent},
    {path: '/packageDetail/:id', name: 'PackageDetail', component: PackageDetailComponent}
])

@CanActivate((next:ComponentInstruction, previous:ComponentInstruction) => {
    return authCheck(next, previous);
})

export class ProjectRouterComponent {

    title = 'Projects';
    formData : Array<any> = [];
    project  : Project;
    searchReturn: Array<any>;

    constructor(
        private _userService:UserService,
        private _authService:AuthService,
        private _formDataService: FormDataService,
        private _projectService: ProjectService,
        private _router: Router
    ) {
        this.project = new Project();
    }

    ngOnInit() {
        this._authService.loggedInCheck();
        this._formDataService.getProjectCreateData()
            .then(formData => this.formData = formData);
    }

    onSubmit(formData) {

        this.project.key = formData.key;
        this.project.name = formData.name;
        this.project.description = formData.description;
        this.project.url = formData.url;
        this.project.lead_user = null;
        //noinspection TypeScriptUnresolvedVariable
        this.project.lead_user_id = formData.selectedSearchValue;

        this._projectService.add(this.project);
        this.project = new Project();

        this._router.navigate(['Projects']);

    }

    onSearch(searchValue: string) {
        this._userService.findUsers(searchValue)
            .then(data => this.searchReturn = data);
    }

}
