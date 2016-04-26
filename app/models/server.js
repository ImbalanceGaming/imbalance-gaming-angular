System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Server;
    return {
        setters:[],
        execute: function() {
            Server = (function () {
                function Server(id, name, address) {
                    this._id = id || null;
                    this._name = name || '';
                    this._address = address || '';
                }
                Object.defineProperty(Server.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Server.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Server.prototype, "address", {
                    get: function () {
                        return this._address;
                    },
                    set: function (value) {
                        this._address = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Server;
            }());
            exports_1("Server", Server);
        }
    }
});
//# sourceMappingURL=server.js.map