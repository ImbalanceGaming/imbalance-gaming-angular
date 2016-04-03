System.register(['angular2/core', 'angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var QuestionControlService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            QuestionControlService = (function () {
                function QuestionControlService(_fb) {
                    this._fb = _fb;
                }
                QuestionControlService.prototype.toControlGroup = function (questions) {
                    var group = {};
                    questions.forEach(function (question) {
                        if (question.controlType === 'dropdown') {
                            //noinspection TypeScriptUnresolvedVariable
                            question.options.forEach(function (option) {
                                if (option.selected) {
                                    group[question.key] = question.required ? [option.value || '', common_1.Validators.required] : option.value || '';
                                }
                            });
                        }
                        else {
                            group[question.key] = question.required ? [question.value || '', common_1.Validators.required] : question.value || '';
                        }
                    });
                    return this._fb.group(group);
                };
                QuestionControlService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], QuestionControlService);
                return QuestionControlService;
            }());
            exports_1("QuestionControlService", QuestionControlService);
        }
    }
});
//# sourceMappingURL=question-control.service.js.map