System.register(["./user"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1;
    var Project;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            Project = (function () {
                function Project(id, key, name, description, status, url, git_url) {
                    this._id = id || null;
                    this._key = key || '';
                    this._name = name || '';
                    this._description = description || '';
                    this._status = status || '';
                    this._url = url || '';
                    this._git_url = git_url || '';
                    this._lead_user = new user_1.User();
                    this._lead_user_id = this._lead_user.id || null;
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