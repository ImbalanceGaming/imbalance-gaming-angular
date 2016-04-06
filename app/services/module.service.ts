import {Injectable}         from 'angular2/core';
import {Observer}           from "rxjs/Observer";
import {Observable}         from "rxjs/Observable";
import 'rxjs/add/operator/share';

import {Module}             from "../models/module";
import {ServiceInterface}   from "../interfaces/service.interface";
import {ApiService}         from "./api.service";
import {MessagesService}    from "../directives/messages/messages.service";
import {TableService}       from "../directives/tables/table.service";
import {TableDataService}   from "./table-data.service";
import {ModuleSection} from "../models/module-section";
import {ModuleSectionService} from "./module-section.service";

@Injectable()
export class ModuleService implements ServiceInterface {

    modules$ : Observable<Array<Module>>;

    private _modulesObserver : Observer<Array<Module>>;

    private _modules : Array<Module> = [];

    constructor(
        private _apiService:ApiService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService,
        private _moduleSectionService:ModuleSectionService
    ) {
        this.modules$ = Observable.create(observer => this._modulesObserver = observer).share();
    }

    create(moduleData) : Module {

        return new Module(
            moduleData.id,
            moduleData.key,
            moduleData.name,
            moduleData.description
        );

    }

    get(id:number) {

        return Promise.resolve(this._modules).then(
            modules => modules.filter(module => module.id === id)[0]
        );

    }

    getModules(page: number = 1, queryAPI:boolean = false, buildTableData:boolean = false) : Promise {

        if (this._modules.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('modules?page='+page)
                .then(
                    data => this.buildModules(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._modules).then(modules => {
                this.set(modules);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }


    }

    set(modules: Array<Module>) {

        this._modules = modules;
        this._modulesObserver.next(this._modules);

    }

    add(module: Module) {

        this._apiService.postWithAuth('modules', this.generateData(module)).subscribe(
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
                this.getModules(1, true, true).then(() => {
                    this.getModules(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    update(module: Module) {

        this._apiService.patch('modules/'+module.id, this.generateData(module)).subscribe(
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
            }
        );

    }

    delete(module: Module) {

        this._apiService.delete('modules/'+module.id).subscribe(
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
                this.getModules(1, true, true).then(() => {
                    this.getModules(this._tableDataService.table.totalPages, true, true);
                });
            }
        );
        
    }

    public generateData(module: Module) {

        return {
            'key': module.key,
            'name': module.name,
            'description': module.description,
        }

    }

    private buildModules(modulesData: any, buildTableData = false) {

        this._modules = [];

        for(let key in modulesData.data) {
            let moduleInfo;
            let moduleSectionsData;

            if (modulesData.data.hasOwnProperty(key)) {
                moduleInfo = modulesData.data[key].module;
                moduleSectionsData = modulesData.data[key].module_sections;
            }

            let module = this.create(moduleInfo);

            if (moduleSectionsData.length > 0) {
                let moduleSections: Array<ModuleSection> = [];
                moduleSections.forEach(sectionData => {
                    moduleSections.push(this._moduleSectionService.create(sectionData));
                });
                module.sections = moduleSections;
            }

            this._modules.push(module);
        }

        this.set(this._modules);

        if (buildTableData) {
            this._tableDataService.getModuleTableData(this._modules, true, modulesData.paginator)
                .then(table => this._tableService.addTable(table));
        }

    }

    private updateTable() {
        this._tableDataService.getModuleTableData(this._modules, false)
            .then(table => this._tableService.addTable(table));
    }

}
