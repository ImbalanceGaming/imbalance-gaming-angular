import {Component}                  from 'angular2/core';
import {ROUTER_DIRECTIVES}     from 'angular2/router';

import {TableDirective}     from "../../../directives/tables/table.directive";
import {MessagesDirective}  from "../../../directives/messages/messages.directive";
import {Project}            from "../../../models/project";
import {ProjectService}     from "../../../services/project.service";

@Component({
    selector: 'projects',
    templateUrl: 'app/components/projects/allProjects/projects.component.html',
    styleUrls: ['app/components/projects/allProjects/projects.component.css'],
    directives: [ROUTER_DIRECTIVES, TableDirective, MessagesDirective]
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
        this._projectService.getProjects(1, true, true);
    }

    pageChanged(event) {
        this._projectService.getProjects(event, true, true);
        return event;
    }

}