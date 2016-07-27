import {Injectable}                 from '@angular/core';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {Project}                    from "../models/project";
import {ApiService}                 from "./api.service";
import {MessagesService}            from "../directives/messages/messages.service";
import {TableService}               from "../directives/tables/table.service";
import {TableDataService}           from "./table-data.service";
import {ServiceInterface}           from "../interfaces/service.interface";
import {UserService}                from "./user.service";
import {ProjectPackage} from "../models/project-package";
import {ProjectHistory} from "../models/project-history";
import {Server} from "../models/server";
import {User} from "../models/user";

@Injectable()
export class ProjectService implements ServiceInterface {

    projects$: Observable<Array<Project>>;

    private _projectsObserver: Observer<Array<Project>>;

    private _projects: Array<Project> = [];

    constructor(
        private _apiService:ApiService,
        private _userService:UserService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService
    ) {
        this.projects$ = Observable.create(observer => this._projectsObserver = observer).share();
    }

    create(projectData) : Project {

        let project = new Project;
        project.id = projectData.id;
        project.key = projectData.key;
        project.name = projectData.name;
        project.description = projectData.description;
        project.url = projectData.url;
        return project;

    }

    get(id:number) {
        return Promise.resolve(this._projects).then(
            projects => projects.filter(project => project.id === id)[0]
        );
    }

    getProjects(page:number = 1, queryAPI:boolean = false, buildTableData:boolean = false) {

        if (this._projects.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('projects?page='+page)
                .then(
                    data => this.buildProjects(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._projects).then(projects => {
                this.set(projects);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }

    }

    set(projects: Array<Project>) {

        this._projects = projects;
        this._projectsObserver.next(this._projects);

    }

    add(project: Project) {

        this._apiService.postWithAuth('projects', this.generateData(project)).subscribe(
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
                this.getProjects(1, true, true).then(() => {
                    this.getProjects(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    update(project: Project) {

        return this._apiService.patchPromise('projects/'+project.id, this.generateData(project)).then(
            data => {
                if (data.success) {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    })
                } else {
                    this._messageService.addMessage({
                        success: null,
                        error: data.error.message
                    })
                }
            }
        );

    }

    delete(project: Project) {

        this._apiService.delete('projects/'+project.id).subscribe(
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
                this.getProjects(1, true, true).then(() => {
                    this.getProjects(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    generateData(project: Project) {
        
        return {
            key : project.key,
            name : project.name,
            description : project.description,
            url : project.url,
            lead_user_id: project.lead_user_id,
        };

    }

    deploy(projectId: number, serverId: number, userId: number) {

        return this._apiService.getPromiseWithAuth('deployProject/'+projectId+'?serverID='+serverId+'&userID='+userId).then(
            data => {
                if (data.success) {
                    this._messageService.addMessage({
                        success: data.success.message,
                        error: null
                    })
                } else {
                    this._messageService.addMessage({
                        success: null,
                        error: data.error.message
                    })
                }
            }
        );

    }

    findProjects(searchTerm: string) {

        return this._apiService.getPromiseWithAuth('findProjects/'+searchTerm)
            .then(
                data => {
                    let projectData = [];
                    data.data.forEach(project => {
                        projectData.push({
                            id: project.id,
                            name: '['+project.key+'] '+project.name
                        });
                    });
                    return projectData;
                },
                error => {
                    return [];
                }
            );

    }

    private buildProjects(projectsData, buildTableData = false) {

        this._projects = [];

        for(let key in projectsData.data) {
            let projectInfo;
            let projectLeadUser;
            let projectPackages;
            let projectHistory;
            let projectServers;
            let projectDeploymentStats;

            if (projectsData.data.hasOwnProperty(key)) {
                projectInfo = projectsData.data[key].project;
                projectLeadUser = projectsData.data[key].lead_user;
                projectPackages = projectsData.data[key].project_packages;
                projectHistory = projectsData.data[key].project_history;
                projectServers = projectsData.data[key].servers;
                projectDeploymentStats = projectsData.data[key].deployment_stats;
            }

            let project = this.create(projectInfo);

            if (projectLeadUser != null) {
                project.lead_user = this._userService.create(projectLeadUser);
            }

            if (projectPackages.length > 0) {
                projectPackages.forEach(packageData => {
                    let projectPackage = new ProjectPackage(
                        packageData.id,
                        packageData.name,
                        packageData.repository,
                        packageData.deploy_branch,
                        packageData.deploy_location
                    );
                    projectPackage.project = project;
                    project.packages.push(projectPackage);
                });
            }

            if (projectHistory.length > 0) {
                projectHistory.forEach(historyData => {
                    let projectHistory = new ProjectHistory(
                        historyData.id,
                        historyData.deployment_date,
                        historyData.user,
                        historyData.server,
                        historyData.status
                    );
                    project.history.push(projectHistory);
                });
            }
            
            if (projectServers.length > 0) {
                projectServers.forEach(serverData => {
                    let server = new Server(
                        serverData.id,
                        serverData.name,
                        serverData.address
                    );
                    project.servers.push(server);
                });
            }

            project.deploymentStats.today = projectDeploymentStats.today;
            project.deploymentStats.week = projectDeploymentStats.week;
            project.deploymentStats.duration = projectDeploymentStats.duration;

            this._projects.push(project);
        }

        this.set(this._projects);

        if (buildTableData) {
            this._tableDataService.getProjectsTableData(this._projects, true, projectsData.paginator)
                .then(table => this._tableService.addTable(table));
        }

    }

    private updateTable() {
        this._tableDataService.getProjectsTableData(this._projects, false)
            .then(table => this._tableService.addTable(table));
    }

}