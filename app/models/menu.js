"use strict";
var Menu = (function () {
    function Menu(id, name, description, placement, link, component) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._placement = placement;
        this._link = link;
        this._component = component;
        this._subSections = [];
    }
    Object.defineProperty(Menu.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            this._description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "placement", {
        get: function () {
            return this._placement;
        },
        set: function (value) {
            this._placement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "link", {
        get: function () {
            return this._link;
        },
        set: function (value) {
            this._link = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "component", {
        get: function () {
            return this._component;
        },
        set: function (value) {
            this._component = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "subSections", {
        get: function () {
            return this._subSections;
        },
        set: function (value) {
            this._subSections = value;
        },
        enumerable: true,
        configurable: true
    });
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map