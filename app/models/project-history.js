"use strict";
var ProjectHistory = (function () {
    function ProjectHistory(id, deployment_date, committer, commit, status) {
        this._id = id || null;
        this._deployment_date = deployment_date || '';
        this._user = committer || '';
        this._server = commit || '';
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
    Object.defineProperty(ProjectHistory.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectHistory.prototype, "server", {
        get: function () {
            return this._server;
        },
        set: function (value) {
            this._server = value;
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
exports.ProjectHistory = ProjectHistory;
//# sourceMappingURL=project-history.js.map