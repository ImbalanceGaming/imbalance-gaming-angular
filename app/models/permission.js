System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Permission;
    return {
        setters:[],
        execute: function() {
            Permission = (function () {
                function Permission(id, name, description, view, add, edit, delete1) {
                    this._id = id || null;
                    this._name = name || '';
                    this._description = description || '';
                    this._view = view || false;
                    this._add = add || false;
                    this._edit = edit || false;
                    this._delete = delete1 || false;
                    this._groups = [];
                    this._module_sections = [];
                    this._users = [];
                }
                Object.defineProperty(Permission.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "view", {
                    get: function () {
                        return this._view;
                    },
                    set: function (value) {
                        this._view = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "add", {
                    get: function () {
                        return this._add;
                    },
                    set: function (value) {
                        this._add = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "edit", {
                    get: function () {
                        return this._edit;
                    },
                    set: function (value) {
                        this._edit = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "delete", {
                    get: function () {
                        return this._delete;
                    },
                    set: function (value) {
                        this._delete = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "groups", {
                    get: function () {
                        return this._groups;
                    },
                    set: function (value) {
                        this._groups = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "module_sections", {
                    get: function () {
                        return this._module_sections;
                    },
                    set: function (value) {
                        this._module_sections = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Permission.prototype, "users", {
                    get: function () {
                        return this._users;
                    },
                    set: function (value) {
                        this._users = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Permission;
            }());
            exports_1("Permission", Permission);
        }
    }
});
//# sourceMappingURL=permission.js.map