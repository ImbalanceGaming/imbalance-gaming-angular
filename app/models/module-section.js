"use strict";
var module_1 = require("./module");
var permission_1 = require("./permission");
var ModuleSection = (function () {
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
exports.ModuleSection = ModuleSection;
//# sourceMappingURL=module-section.js.map