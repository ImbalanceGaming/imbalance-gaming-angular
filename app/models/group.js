"use strict";
var Group = (function () {
    function Group(id, name, description) {
        this._users = [];
        this._projects = [];
        this._id = id || null;
        this._name = name || '';
        this._description = description || '';
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
exports.Group = Group;
//# sourceMappingURL=group.js.map