System.register(['angular2/core', "ng2-bs3-modal/ng2-bs3-modal", "../question-control.service", "./dynamic-modal-form-question.directive"], function(exports_1, context_1) {
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
    var core_1, ng2_bs3_modal_1, question_control_service_1, dynamic_modal_form_question_directive_1;
    var DynamicModalFormDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (question_control_service_1_1) {
                question_control_service_1 = question_control_service_1_1;
            },
            function (dynamic_modal_form_question_directive_1_1) {
                dynamic_modal_form_question_directive_1 = dynamic_modal_form_question_directive_1_1;
            }],
        execute: function() {
            DynamicModalFormDirective = (function () {
                function DynamicModalFormDirective(_qcs) {
                    this._qcs = _qcs;
                    this.questions = [];
                    this.searchReturn = [];
                    this.saveEmitter = new core_1.EventEmitter();
                    this.searchEmitter = new core_1.EventEmitter();
                }
                DynamicModalFormDirective.prototype.ngOnInit = function () {
                    this.form = this._qcs.toControlGroup(this.questions);
                };
                DynamicModalFormDirective.prototype.onSubmit = function () {
                    this.saveEmitter.emit(this.form.value);
                };
                DynamicModalFormDirective.prototype.onSearch = function (searchValue) {
                    this.searchEmitter.emit(searchValue);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DynamicModalFormDirective.prototype, "modalHeader", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DynamicModalFormDirective.prototype, "buttonText", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicModalFormDirective.prototype, "questions", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicModalFormDirective.prototype, "searchReturn", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicModalFormDirective.prototype, "saveEmitter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicModalFormDirective.prototype, "searchEmitter", void 0);
                DynamicModalFormDirective = __decorate([
                    core_1.Component({
                        selector: 'dynamic-modal-form',
                        templateUrl: 'app/directives/dynamic-form/modalForm/dynamic-modal-form.directive.html',
                        directives: [dynamic_modal_form_question_directive_1.DynamicModalFormQuestionDirective, ng2_bs3_modal_1.MODAL_DIRECTIVES],
                        providers: [question_control_service_1.QuestionControlService]
                    }), 
                    __metadata('design:paramtypes', [question_control_service_1.QuestionControlService])
                ], DynamicModalFormDirective);
                return DynamicModalFormDirective;
            }());
            exports_1("DynamicModalFormDirective", DynamicModalFormDirective);
        }
    }
});
//# sourceMappingURL=dynamic-modal-form.directive.js.map