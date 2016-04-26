System.register(["./module", "./permission"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var module_1, permission_1;
    var ModuleSection;
    return {
        setters:[
            function (module_1_1) {
                module_1 = module_1_1;
            },
            function (permission_1_1) {
                permission_1 = permission_1_1;
            }],
        execute: function() {
            ModuleSection = (function () {
                function ModuleSection(id, name, description) {
                    this._id = id || null;
                    this._name = name || '';
                    this._description = description || '';
                    this._module = new module_1.Module();
                    this._permission = new permission_1.Permission();
                }
                Object.defineProperty(ModuleSection.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModuleSection.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModuleSection.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModuleSection.prototype, "module", {
                    get: function () {
                        return this._module;
                    },
                    set: function (value) {
                        this._module = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModuleSection.prototype, "permission", {
                    get: function () {
                        return this._permission;
                    },
                    set: function (value) {
                        this._permission = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ModuleSection;
            }());
            exports_1("ModuleSection", ModuleSection);
        }
    }
});
//# sourceMappingURL=module-section.js.map