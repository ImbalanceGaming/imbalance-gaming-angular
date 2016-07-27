"use strict";
var ProjectDeploymentStats = (function () {
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
exports.ProjectDeploymentStats = ProjectDeploymentStats;
//# sourceMappingURL=project-deployment-stats.js.map