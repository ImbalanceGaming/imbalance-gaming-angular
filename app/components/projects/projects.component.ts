import {Component}                  from 'angular2/core';
import {CanActivate, ROUTER_DIRECTIVES, Router}     from 'angular2/router';

import {authCheck}            from "../../common/auth-check"
import {ComponentInstruction} from "../../../node_modules/angular2/src/router/instruction";

import {TableDirective}     from "../../directives/tables/table.directive";
import {MessagesDirective}  from "../../directives/messages/messages.directive";
import {Project}            from "../../models/project";
import {ProjectService}     from "../../services/project.service";

@Component({
    selector: 'projects',
    templateUrl: 'app/components/projects/projects.component.html',
    styleUrls: ['app/components/projects/projects.component.css'],
    directives: [ROUTER_DIRECTIVES, TableDirective, MessagesDirective]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck(next, previous);
})

export class ProjectsComponent {

    public title  : string;
    public active : boolean;

    public projects : Array<Project> = [];
    public project  : Project;
    public formData : Array<any> = [];

    constructor(
        private _projectService: ProjectService
    ) {
        this.title = 'All Projects';
        this.active = true;
    }

    ngOnInit() {
        this._projectService.projects$.subscribe(groups => this.projects = groups);
        this._projectService.getProjects(1, false, true);
    }

    pageChanged(event) {
        this._projectService.getProjects(event, true, true);
        return event;
    }

    deploy(id: number) {
        this._projectService.deploy(id);
    }

}