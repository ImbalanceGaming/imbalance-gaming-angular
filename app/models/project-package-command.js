System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProjectPackageCommand;
    return {
        setters:[],
        execute: function() {
            ProjectPackageCommand = (function () {
                function ProjectPackageCommand(id, command, order, run_on, command_type, project_package_id) {
                    this._id = id || null;
                    this._command = command || '';
                    this._order = order || null;
                    this._run_on = run_on || '';
                    this._command_type = command_type || '';
                    this._project_package_id = project_package_id || null;
                }
                Object.defineProperty(ProjectPackageCommand.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectPackageCommand.prototype, "command", {
                    get: function () {
                        return this._command;
                    },
                    set: function (value) {
                        this._command = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectPackageCommand.prototype, "order", {
                    get: function () {
                        return this._order;
                    },
                    set: function (value) {
                        this._order = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectPackageCommand.prototype, "run_on", {
                    get: function () {
                        return this._run_on;
                    },
                    set: function (value) {
                        this._run_on = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectPackageCommand.prototype, "command_type", {
                    get: function () {
                        return this._command_type;
                    },
                    set: function (value) {
                        this._command_type = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectPackageCommand.prototype, "project_package_id", {
                    get: function () {
                        return this._project_package_id;
                    },
                    set: function (value) {
                        this._project_package_id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ProjectPackageCommand;
            }());
            exports_1("ProjectPackageCommand", ProjectPackageCommand);
        }
    }
});
//# sourceMappingURL=project-package-command.js.map