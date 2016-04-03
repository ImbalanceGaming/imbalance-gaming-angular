System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Project;
    return {
        setters:[],
        execute: function() {
            Project = (function () {
                function Project() {
                }
                Object.defineProperty(Project.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "key", {
                    get: function () {
                        return this._key;
                    },
                    set: function (value) {
                        this._key = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    set: function (value) {
                        this._status = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "lead_user", {
                    get: function () {
                        return this._lead_user;
                    },
                    set: function (value) {
                        this._lead_user = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "lead_user_id", {
                    get: function () {
                        return this._lead_user_id;
                    },
                    set: function (value) {
                        this._lead_user_id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "url", {
                    get: function () {
                        return this._url;
                    },
                    set: function (value) {
                        this._url = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Project.prototype, "git_url", {
                    get: function () {
                        return this._git_url;
                    },
                    set: function (value) {
                        this._git_url = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Project;
            }());
            exports_1("Project", Project);
        }
    }
});
//# sourceMappingURL=project.js.map