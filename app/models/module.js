"use strict";
var permission_1 = require("./permission");
var Module = (function () {
    function Module(id, key, name, description) {
        this._id = id || null;
        this._key = key || '';
        this._name = name || '';
        this._description = description || '';
        this._sections = [];
        this._menus = [];
        this._permission = new permission_1.Permission();
    }
    Object.defineProperty(Module.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            this._description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "sections", {
        get: function () {
            return this._sections;
        },
        set: function (value) {
            this._sections = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "menus", {
        get: function () {
            return this._menus;
        },
        set: function (value) {
            this._menus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "permission", {
        get: function () {
            return this._permission;
        },
        set: function (value) {
            this._permission = value;
        },
        enumerable: true,
        configurable: true
    });
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=module.js.map