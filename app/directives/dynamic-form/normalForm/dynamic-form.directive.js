"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var dynamic_form_question_directive_1 = require("./dynamic-form-question.directive");
var question_control_service_1 = require("../question-control.service");
var form_buttons_directive_1 = require("../../form-buttons/form-buttons.directive");
var DynamicFormDirective = (function () {
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
        this.form = this._qcs.toFormGroup(this.questions);
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
            directives: [dynamic_form_question_directive_1.DynamicFormQuestionDirective, form_buttons_directive_1.FormButtonsDirective, forms_1.REACTIVE_FORM_DIRECTIVES],
            providers: [question_control_service_1.QuestionControlService]
        }), 
        __metadata('design:paramtypes', [question_control_service_1.QuestionControlService])
    ], DynamicFormDirective);
    return DynamicFormDirective;
}());
exports.DynamicFormDirective = DynamicFormDirective;
//# sourceMappingURL=dynamic-form.directive.js.map