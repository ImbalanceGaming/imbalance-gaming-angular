import {Injectable}                 from '@angular/core';
import {Observable}                 from 'rxjs/Observable';
import {Observer}                   from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {ApiService}                 from "./api.service";
import {MessagesService}            from "../directives/messages/messages.service";
import {ServiceInterface}           from "../interfaces/service.interface";
import {ProjectPackageCommand} from "../models/project-package-command";

@Injectable()
export class ProjectPackageCommandService implements ServiceInterface {

    packageCommand$: Observable<ProjectPackageCommand>;
    private _packageCommandObserver: Observer<ProjectPackageCommand>;
    private _packageCommand: ProjectPackageCommand = new ProjectPackageCommand();

    constructor(
        private _apiService:ApiService,
        private _messageService:MessagesService
    ) {
        this.packageCommand$ = Observable.create(observer => this._packageCommandObserver = observer).share();
    }

    create(packageCommandData) : ProjectPackageCommand {

        let packageCommand = new ProjectPackageCommand;
        packageCommand.id = packageCommandData.id;
        packageCommand.command = packageCommandData.command;
        packageCommand.order = packageCommandData.order;
        packageCommand.run_on = packageCommandData.run_on;
        packageCommand.command_type = packageCommandData.command_type;
        return packageCommand;

    }

    get() {
        return this._apiService.getPromiseWithAuth('projectPackageCommands')
            .then(
                data => this.set(this.create(data)),
                error => {
                    this._messageService.addMessage({
                        success: null,
                        error: error
                    })
                }
            );
    }

    set(packageCommand: ProjectPackageCommand) {

        this._packageCommand = packageCommand;
        this._packageCommandObserver.next(this._packageCommand);

    }

    add(packageCommand: ProjectPackageCommand) {

        return this._apiService.postPromiseWithAuth('projectPackageCommands', this.generateData(packageCommand)).then(
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

    update(packageCommand: ProjectPackageCommand) {

        return this._apiService.patchPromise('projectPackageCommands/'+packageCommand.id, this.generateData(packageCommand)).then(
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

    delete(packageCommand: ProjectPackageCommand) {

        return this._apiService.deletePromise('projectPackageCommands/'+packageCommand.id).then(
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

    generateData(packageCommand: ProjectPackageCommand) {
        
        return {
            command : packageCommand.command,
            order : packageCommand.order,
            run_on : packageCommand.run_on,
            command_type : packageCommand.command_type,
            project_package_id: packageCommand.project_package_id,
        };

    }

}