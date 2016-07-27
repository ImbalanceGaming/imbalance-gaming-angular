"use strict";
var QuestionBase = (function () {
    function QuestionBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.read_only = !!options.read_only;
        this.update_filed = options.update_field || null;
        this.search_box = options.search_box || false;
    }
    return QuestionBase;
}());
exports.QuestionBase = QuestionBase;
//# sourceMappingURL=question-base.js.map