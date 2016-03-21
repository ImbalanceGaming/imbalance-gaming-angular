import {Injectable}                 from 'angular2/core';
import {Http}                       from 'angular2/http';

import {Module}                     from "../models/module";
import {ModuleSection}              from '../models/module.section';
import {Menu}                       from "../models/menu";

@Injectable()
export class ModuleService {

    private _modules : Array<Module>;

    constructor() {
        this._modules = [];
    }

    get modules():Array<Module> {
        return this._modules;
    }

    set modules(value:Array<Module>) {
        this._modules = value;
    }

    public createModules(data:Array<any>) {

        data.forEach(function(module_data) {
            let module = new Module(module_data.moduleId, module_data.key, module_data.name, module_data.description);

            //noinspection TypeScriptUnresolvedVariable
            module_data.module_sections.forEach(function(section) {
                //noinspection TypeScriptUnresolvedVariable
                let moduleSection = new ModuleSection(section.id, section.name, section.description);
                module.sections.push(moduleSection);

                //noinspection TypeScriptUnresolvedVariable
                section.menus.forEach(function(menu_data) {
                    //noinspection TypeScriptUnresolvedVariable
                    let menu = new Menu(
                        menu_data.id,
                        menu_data.name,
                        menu_data.description,
                        menu_data.placement,
                        menu_data.link,
                        menu_data.component
                    );
                    module.menus.push(menu);
                });
            });

            this._modules.push(module);
        }, this);

    }

}
