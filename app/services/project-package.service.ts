import {Injectable}                 from 'angular2/core';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {ApiService}                 from "./api.service";
import {MessagesService}            from "../directives/messages/messages.service";
import {TableService}               from "../directives/tables/table.service";
import {TableDataService}           from "./table-data.service";
import {ServiceInterface}           from "../interfaces/service.interface";
import {ProjectPackage} from "../models/project-package";
import {ProjectPackageCommand} from "../models/project-package-command";

@Injectable()
export class ProjectPackageService implements ServiceInterface {

    projectPackages$: Observable<Array<ProjectPackage>>;
    private _projectPackagesObserver: Observer<Array<ProjectPackage>>;
    private _projectPackages: Array<ProjectPackage> = [];

    projectPackage$: Observable<ProjectPackage>;
    private _projectPackageObserver: Observer<ProjectPackage>;
    private _projectPackage: ProjectPackage = new ProjectPackage();

    constructor(
        private _apiService:ApiService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService
    ) {
        this.projectPackages$ = Observable.create(observer => this._projectPackagesObserver = observer).share();
        this.projectPackage$ = Observable.create(observer => this._projectPackageObserver = observer).share();
    }

    create(projectPackageData) : ProjectPackage {

        return new ProjectPackage(
            projectPackageData.id,
            projectPackageData.name,
            projectPackageData.repository,
            projectPackageData.deploy_branch,
            projectPackageData.deploy_location
        );

    }

    get(id:number) {
        return Promise.resolve(this._projectPackages).then(
            projectPackages => projectPackages.filter(projectPackage => projectPackage.id === id)[0]
        );
    }

    getPackage() {
        return this._projectPackage;
    }

    getProjectPackage(id: number) {

        return this._apiService.getPromiseWithAuth('projectPackages/'+id)
            .then(
                data => this.buildProjectPackage(data, false),
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error
                    })
                }
            );

    }

    getProjectPackages(page:number = 1, queryAPI:boolean = false, buildTableData:boolean = false) {

        if (this._projectPackages.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('projectPackages?page='+page)
                .then(
                    data => this.buildProjectPackages(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._projectPackages).then(projectPackages => {
                this.set(projectPackages);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }

    }
    

    set(projectPackages: Array<ProjectPackage>) {

        this._projectPackages = projectPackages;
        this._projectPackagesObserver.next(this._projectPackages);

    }

    setPackage(projectPackage: ProjectPackage) {

        this._projectPackage = projectPackage;
        // this._projectPackageObserver.next(this._projectPackage);

    }

    add(projectPackage: ProjectPackage) {

        return this._apiService.postPromiseWithAuth('projectPackages', this.generateData(projectPackage)).then(
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

    update(projectPackage: ProjectPackage) : Promise {

        return this._apiService.patchPromise('projectPackages/'+projectPackage.id, this.generateData(projectPackage)).then(
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

    delete(projectPackage: ProjectPackage) {

        return this._apiService.deletePromise('projectPackages/'+projectPackage.id).then(
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

    generateData(projectPackage: ProjectPackage) {
        
        return {
            name : projectPackage.name,
            repository : projectPackage.repository,
            deploy_branch : projectPackage.deploy_branch,
            deploy_location : projectPackage.deploy_location,
            project_id: projectPackage.project.id,
        };

    }

    private buildProjectPackages(projectPackagesData, buildTableData = false) {

        this._projectPackages = [];

        for(let key in projectPackagesData.data) {
            if (projectPackagesData.data.hasOwnProperty(key)) {
                this._projectPackages.push(this.buildProjectPackage(projectPackagesData.data[key]));
            }
        }

        this.set(this._projectPackages);

        if (buildTableData) {
            this._tableDataService.getProjectPackageTableData(this._projectPackages, true, projectPackagesData.paginator)
                .then(table => this._tableService.addTable(table));
        }

    }

    private buildProjectPackage(packageData, forGroup: boolean = true) {

        let projectPackageInfo;
        let projectPackageCommands;

        projectPackageInfo = packageData.package;
        projectPackageCommands = packageData.commands;

        let projectPackage = this.create(projectPackageInfo);
        projectPackage.project.id = projectPackageInfo.project_id;

        if (projectPackageCommands.length > 0) {
            projectPackageCommands.forEach(packageCommandData => {
                let projectPackageCommand = new ProjectPackageCommand(
                    packageCommandData.id,
                    packageCommandData.command,
                    packageCommandData.order,
                    packageCommandData.run_on,
                    packageCommandData.command_type,
                    packageCommandData.project_package_id
                );
                projectPackage.commands.push(projectPackageCommand);
            });
        }

        if (!forGroup) {
            this.setPackage(projectPackage);
        }

        return projectPackage;

    }

    private updateTable() {
        this._tableDataService.getProjectPackageTableData(this._projectPackages, false)
            .then(table => this._tableService.addTable(table));
    }

}