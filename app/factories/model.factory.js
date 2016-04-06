System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ModelFactory;
    return {
        setters:[],
        execute: function() {
            ModelFactory = (function () {
                function ModelFactory() {
                }
                ModelFactory.prototype.createModel = function (model, modelProperties, modelRelations, relationData) {
                    var model = new model();
                    var _loop_1 = function(key) {
                        if (model.hasOwnProperty(key)) {
                            modelProperties.forEach(function (property) {
                                if (property.name === key) {
                                    model[key] = property;
                                }
                            });
                            modelRelations.forEach(function (relation) {
                                if (relation.name === key) {
                                    var relation_1 = new relation_1.object();
                                    relationData.forEach(function (data) {
                                    });
                                }
                            });
                        }
                    };
                    for (var key in model) {
                        _loop_1(key);
                    }
                    return T;
                };
                return ModelFactory;
            }());
            exports_1("ModelFactory", ModelFactory);
        }
    }
});
//# sourceMappingURL=model.factory.js.map