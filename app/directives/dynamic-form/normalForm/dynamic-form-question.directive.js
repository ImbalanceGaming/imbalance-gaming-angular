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
var question_base_1 = require("../models/question-base");
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var DynamicFormQuestionDirective = (function () {
    function DynamicFormQuestionDirective() {
        this.searchReturn = [];
        this.searchEmitter = new core_1.EventEmitter();
    }
    DynamicFormQuestionDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.question.search_box) {
            this.form.controls[this.question.key]
                .valueChanges
                .debounceTime(400)
                .distinctUntilChanged()
                .subscribe(function (term) {
                _this.onSearch(term);
            });
        }
    };
    Object.defineProperty(DynamicFormQuestionDirective.prototype, "isValid", {
        get: function () {
            if (this.question.required) {
                return (this.form.controls[this.question.key].valid || this.form.controls[this.question.key].pristine);
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormQuestionDirective.prototype.onSearch = function (searchValue) {
        this.searchEmitter.emit(searchValue);
    };
    DynamicFormQuestionDirective.prototype.selectLead = function (user) {
        this.form.controls[this.question.key].updateValue(user.name);
        this.form.controls['selectedSearchValue'].updateValue(user.id);
        this.searchReturn = [];
    };
    DynamicFormQuestionDirective.prototype.checkboxChange = function () {
        if (this.form.value[this.question.key] == '1') {
            this.form.controls[this.question.key].updateValue(false);
        }
        else {
            this.form.controls[this.question.key].updateValue(true);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', question_base_1.QuestionBase)
    ], DynamicFormQuestionDirective.prototype, "question", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], DynamicFormQuestionDirective.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DynamicFormQuestionDirective.prototype, "searchReturn", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormQuestionDirective.prototype, "searchEmitter", void 0);
    DynamicFormQuestionDirective = __decorate([
        core_1.Component({
            selector: 'df-question',
            templateUrl: 'app/directives/dynamic-form/normalForm/dynamic-form-question.directive.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormQuestionDirective);
    return DynamicFormQuestionDirective;
}());
exports.DynamicFormQuestionDirective = DynamicFormQuestionDirective;
//# sourceMappingURL=dynamic-form-question.directive.js.map