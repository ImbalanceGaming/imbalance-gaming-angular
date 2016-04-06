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

@Injectable()
export class ModuleSectionService implements ServiceInterface {

    moduleSections$ : Observable<Array<ModuleSection>>;

    private _moduleSectionsObserver : Observer<Array<ModuleSection>>;

    private _moduleSections : Array<ModuleSection> = [];

    constructor(
        private _apiService:ApiService,
        private _messageService:MessagesService,
        private _tableService:TableService,
        private _tableDataService:TableDataService
    ) {
        this.moduleSections$ = Observable.create(observer => this._moduleSectionsObserver = observer).share();
    }

    create(moduleSectionData) : ModuleSection {

        return new ModuleSection(
            moduleSectionData.id,
            moduleSectionData.name,
            moduleSectionData.description
        );

    }

    get(id:number) {

        return Promise.resolve(this._moduleSections).then(
            modules => modules.filter(moduleSection => moduleSection.id === id)[0]
        );

    }

    getModuleSections(page: number = 1, queryAPI:boolean = false, buildTableData:boolean = false) : Promise {

        if (this._moduleSections.length === 0 || queryAPI) {
            return this._apiService.getPromiseWithAuth('moduleSections?page='+page)
                .then(
                    data => this.buildModuleSections(data, buildTableData),
                    error => {
                        this._messageService.addMessage({
                            success: null,
                            error: error
                        })
                    }
                );
        } else {
            return Promise.resolve(this._moduleSections).then(moduleSections => {
                this.set(moduleSections);
                if (buildTableData) {
                    this.updateTable();
                }
            });
        }


    }

    set(moduleSections: Array<ModuleSection>) {

        this._moduleSections = moduleSections;
        this._moduleSectionsObserver.next(this._moduleSections);

    }

    add(moduleSection: ModuleSection) {

        this._apiService.postWithAuth('modules', this.generateData(moduleSection)).subscribe(
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
                this.getModuleSections(1, true, true).then(() => {
                    this.getModuleSections(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    update(moduleSection: ModuleSection) {

        this._apiService.patch('modules/'+module.id, this.generateData(moduleSection)).subscribe(
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

    delete(moduleSection: ModuleSection) {

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
                this.getModuleSections(1, true, true).then(() => {
                    this.getModuleSections(this._tableDataService.table.totalPages, true, true);
                });
            }
        );

    }

    findModuleSections(searchTerm: string) {

        return this._apiService.getPromiseWithAuth('findModuleSections/'+searchTerm)
            .then(
                data => {
                    let moduleSectionsData = [];
                    data.data.forEach(module_section => {
                        moduleSectionsData.push({
                            id: module_section.id,
                            name: module_section.name
                        });
                    });
                    return moduleSectionsData;
                },
                error => {
                    return [];
                }
            );

    }

    public generateData(moduleSection: ModuleSection) {

        return {
            'name': moduleSection.name,
            'description': moduleSection.description,
        }

    }

    private buildModuleSections(moduleSectionsData: any, buildTableData = false) {

        this._moduleSections = [];

        for(let key in moduleSectionsData.data) {
            let moduleSectionInfo;
            let moduleInfo;

            if (moduleSectionsData.data.hasOwnProperty(key)) {
                //noinspection TypeScriptUnresolvedVariable
                moduleSectionInfo = moduleSectionsData.data[key].module_section;
                moduleInfo = moduleSectionsData.data[key].module;
            }

            let moduleSection = this.create(moduleInfo);

            moduleSection.module = new Module(moduleInfo.id, moduleInfo.key, moduleInfo.name, moduleInfo.description);

            this._moduleSections.push(moduleSection);
        }

        this.set(this._moduleSections);

        if (buildTableData) {
            this._tableDataService.getModuleSectionTableData(this._moduleSections, true, moduleSectionsData.paginator)
                .then(table => this._tableService.addTable(table));
        }

    }

    private updateTable() {
        this._tableDataService.getModuleSectionTableData(this._moduleSections, false)
            .then(table => this._tableService.addTable(table));
    }

}

