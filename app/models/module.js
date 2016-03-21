System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Module;
    return {
        setters:[],
        execute: function() {
            Module = (function () {
                function Module(id, key, name, description) {
                    this._id = id;
                    this._key = key;
                    this._name = name;
                    this._description = description;
                    this._sections = [];
                    this._menus = [];
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
                return Module;
            }());
            exports_1("Module", Module);
        }
    }
});
//# sourceMappingURL=module.js.map