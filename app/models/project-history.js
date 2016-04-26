System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProjectHistory;
    return {
        setters:[],
        execute: function() {
            ProjectHistory = (function () {
                function ProjectHistory(id, deployment_date, committer, commit, status) {
                    this._id = id || null;
                    this._deployment_date = deployment_date || '';
                    this._committer = committer || '';
                    this._commit = commit || '';
                    this._status = status || '';
                }
                Object.defineProperty(ProjectHistory.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectHistory.prototype, "deployment_date", {
                    get: function () {
                        return this._deployment_date;
                    },
                    set: function (value) {
                        this._deployment_date = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectHistory.prototype, "committer", {
                    get: function () {
                        return this._committer;
                    },
                    set: function (value) {
                        this._committer = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectHistory.prototype, "commit", {
                    get: function () {
                        return this._commit;
                    },
                    set: function (value) {
                        this._commit = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectHistory.prototype, "status", {
                    get: function () {
                        return this._status;
                    },
                    set: function (value) {
                        this._status = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ProjectHistory;
            }());
            exports_1("ProjectHistory", ProjectHistory);
        }
    }
});
//# sourceMappingURL=project-history.js.map