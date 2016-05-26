System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ProjectDeploymentStats;
    return {
        setters:[],
        execute: function() {
            ProjectDeploymentStats = (function () {
                function ProjectDeploymentStats(today, week, duration) {
                    this._today = today || 0;
                    this._week = week || 0;
                    this._duration = duration || 0;
                }
                Object.defineProperty(ProjectDeploymentStats.prototype, "today", {
                    get: function () {
                        return this._today;
                    },
                    set: function (value) {
                        this._today = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectDeploymentStats.prototype, "week", {
                    get: function () {
                        return this._week;
                    },
                    set: function (value) {
                        this._week = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ProjectDeploymentStats.prototype, "duration", {
                    get: function () {
                        return this._duration;
                    },
                    set: function (value) {
                        this._duration = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ProjectDeploymentStats;
            }());
            exports_1("ProjectDeploymentStats", ProjectDeploymentStats);
        }
    }
});
//# sourceMappingURL=project-deployment-stats.js.map