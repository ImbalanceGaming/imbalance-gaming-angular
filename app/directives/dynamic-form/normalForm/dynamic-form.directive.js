System.register(['angular2/core', "./dynamic-form-question.directive", "../question-control.service", "../../form-buttons/form-buttons.directive"], function(exports_1, context_1) {
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
    var core_1, dynamic_form_question_directive_1, question_control_service_1, form_buttons_directive_1;
    var DynamicFormDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dynamic_form_question_directive_1_1) {
                dynamic_form_question_directive_1 = dynamic_form_question_directive_1_1;
            },
            function (question_control_service_1_1) {
                question_control_service_1 = question_control_service_1_1;
            },
            function (form_buttons_directive_1_1) {
                form_buttons_directive_1 = form_buttons_directive_1_1;
            }],
        execute: function() {
            DynamicFormDirective = (function () {
                function DynamicFormDirective(_qcs) {
                    this._qcs = _qcs;
                    this.questions = [];
                    this.searchReturn = [];
                    this.saveEmitter = new core_1.EventEmitter();
                    this.deleteEmitter = new core_1.EventEmitter();
                    this.cancelEmitter = new core_1.EventEmitter();
                    this.searchEmitter = new core_1.EventEmitter();
                }
                DynamicFormDirective.prototype.ngOnInit = function () {
                    this.form = this._qcs.toControlGroup(this.questions);
                };
                DynamicFormDirective.prototype.onSubmit = function () {
                    this.saveEmitter.emit(this.form.value);
                };
                DynamicFormDirective.prototype.save = function () {
                    this.onSubmit();
                };
                DynamicFormDirective.prototype.delete = function () {
                    this.deleteEmitter.emit(true);
                };
                DynamicFormDirective.prototype.cancel = function () {
                    this.cancelEmitter.emit(true);
                };
                DynamicFormDirective.prototype.onSearch = function (searchValue) {
                    this.searchEmitter.emit(searchValue);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicFormDirective.prototype, "questions", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicFormDirective.prototype, "formButtonData", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicFormDirective.prototype, "searchReturn", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicFormDirective.prototype, "saveEmitter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicFormDirective.prototype, "deleteEmitter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicFormDirective.prototype, "cancelEmitter", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicFormDirective.prototype, "searchEmitter", void 0);
                DynamicFormDirective = __decorate([
                    core_1.Component({
                        selector: 'dynamic-form',
                        templateUrl: 'app/directives/dynamic-form/normalForm/dynamic-form.directive.html',
                        directives: [dynamic_form_question_directive_1.DynamicFormQuestionDirective, form_buttons_directive_1.FormButtonsDirective],
                        providers: [question_control_service_1.QuestionControlService]
                    }), 
                    __metadata('design:paramtypes', [question_control_service_1.QuestionControlService])
                ], DynamicFormDirective);
                return DynamicFormDirective;
            }());
            exports_1("DynamicFormDirective", DynamicFormDirective);
        }
    }
});
//# sourceMappingURL=dynamic-form.directive.js.map