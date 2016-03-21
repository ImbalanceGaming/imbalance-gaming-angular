System.register(['angular2/core', "../models/module", '../models/module.section', "../models/menu"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, module_1, module_section_1, menu_1;
    var ModuleService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (module_1_1) {
                module_1 = module_1_1;
            },
            function (module_section_1_1) {
                module_section_1 = module_section_1_1;
            },
            function (menu_1_1) {
                menu_1 = menu_1_1;
            }],
        execute: function() {
            ModuleService = (function () {
                function ModuleService() {
                    this._modules = [];
                }
                Object.defineProperty(ModuleService.prototype, "modules", {
                    get: function () {
                        return this._modules;
                    },
                    set: function (value) {
                        this._modules = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                ModuleService.prototype.createModules = function (data) {
                    data.forEach(function (module_data) {
                        var module = new module_1.Module(module_data.moduleId, module_data.key, module_data.name, module_data.description);
                        //noinspection TypeScriptUnresolvedVariable
                        module_data.module_sections.forEach(function (section) {
                            //noinspection TypeScriptUnresolvedVariable
                            var moduleSection = new module_section_1.ModuleSection(section.id, section.name, section.description);
                            module.sections.push(moduleSection);
                            //noinspection TypeScriptUnresolvedVariable
                            section.menus.forEach(function (menu_data) {
                                //noinspection TypeScriptUnresolvedVariable
                                var menu = new menu_1.Menu(menu_data.id, menu_data.name, menu_data.description, menu_data.placement, menu_data.link, menu_data.component);
                                module.menus.push(menu);
                            });
                        });
                        this._modules.push(module);
                    }, this);
                };
                ModuleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ModuleService);
                return ModuleService;
            }());
            exports_1("ModuleService", ModuleService);
        }
    }
});
//# sourceMappingURL=module.service.js.map