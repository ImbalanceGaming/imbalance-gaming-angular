System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Group;
    return {
        setters:[],
        execute: function() {
            Group = (function () {
                function Group() {
                    this._users = [];
                    this._projects = [];
                }
                Object.defineProperty(Group.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Group.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Group.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Group.prototype, "users", {
                    get: function () {
                        return this._users;
                    },
                    set: function (value) {
                        this._users = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Group.prototype, "projects", {
                    get: function () {
                        return this._projects;
                    },
                    set: function (value) {
                        this._projects = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Group;
            }());
            exports_1("Group", Group);
        }
    }
});
//# sourceMappingURL=group.js.map