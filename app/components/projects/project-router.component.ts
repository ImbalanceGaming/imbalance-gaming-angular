import {Component}      from '@angular/core';
import {ROUTER_DIRECTIVES, RouterOutlet, Router} from '@angular/router';

import {UserService}        from '../../services/user.service';
import {DynamicModalFormDirective} from "../../directives/dynamic-form/modalForm/dynamic-modal-form.directive";
import {FormDataService} from "../../services/form-data.service";
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {ProjectPackageService} from "../../services/project-package.service";

@Component({
    selector: 'user-management',
    templateUrl: 'app/components/projects/project-router.component.html',
    styleUrls: ['app/components/projects/project-router.component.css'],
    directives: [RouterOutlet, ROUTER_DIRECTIVES, DynamicModalFormDirective],
    providers: [ProjectPackageService]
})

export class ProjectRouterComponent {

    title = 'Projects';
    formData : Array<any> = [];
    project  : Project;
    searchReturn: Array<any>;

    constructor(
        private _userService:UserService,
        private _formDataService: FormDataService,
        private _projectService: ProjectService,
        private _router: Router
    ) {
        this.project = new Project();
    }

    ngOnInit() {
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

        this._router.navigate(['/projects']);

    }

    onSearch(searchValue: string) {
        this._userService.findUsers(searchValue)
            .then(data => this.searchReturn = data);
    }

}
