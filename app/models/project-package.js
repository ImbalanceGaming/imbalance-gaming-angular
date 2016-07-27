"use strict";
var project_1 = require("./project");
var ProjectPackage = (function () {
    function ProjectPackage(id, name, repository, deploy_branch, deploy_location) {
        this._id = id || null;
        this._name = name || '';
        this._repository = repository || '';
        this._deploy_branch = deploy_branch || '';
        this._deploy_location = deploy_location || '';
        this._project = new project_1.Project();
        this._commands = [];
    }
    Object.defineProperty(ProjectPackage.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectPackage.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectPackage.prototype, "repository", {
        get: function () {
            return this._repository;
        },
        set: function (value) {
            this._repository = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectPackage.prototype, "deploy_branch", {
        get: function () {
            return this._deploy_branch;
        },
        set: function (value) {
            this._deploy_branch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectPackage.prototype, "deploy_location", {
        get: function () {
            return this._deploy_location;
        },
        set: function (value) {
            this._deploy_location = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectPackage.prototype, "project", {
        get: function () {
            return this._project;
        },
        set: function (value) {
            this._project = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectPackage.prototype, "commands", {
        get: function () {
            return this._commands;
        },
        set: function (value) {
            this._commands = value;
        },
        enumerable: true,
        configurable: true
    });
    return ProjectPackage;
}());
exports.ProjectPackage = ProjectPackage;
//# sourceMappingURL=project-package.js.map