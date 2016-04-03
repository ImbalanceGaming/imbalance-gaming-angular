System.register(['angular2/core', 'angular2/common', "../models/question-base"], function(exports_1, context_1) {
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
    var core_1, common_1, question_base_1;
    var DynamicModalFormQuestionDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (question_base_1_1) {
                question_base_1 = question_base_1_1;
            }],
        execute: function() {
            DynamicModalFormQuestionDirective = (function () {
                function DynamicModalFormQuestionDirective() {
                    this.searchReturn = [];
                    this.searchEmitter = new core_1.EventEmitter();
                }
                DynamicModalFormQuestionDirective.prototype.ngOnInit = function () {
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
                    if (this.question.update_filed) {
                        this.form.controls[this.question.key]
                            .valueChanges
                            .debounceTime(400)
                            .distinctUntilChanged()
                            .subscribe(function () {
                            _this.form.controls[_this.question.update_filed].updateValue(_this.updateField(/\b(\w)/g));
                        });
                    }
                };
                Object.defineProperty(DynamicModalFormQuestionDirective.prototype, "isValid", {
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
                DynamicModalFormQuestionDirective.prototype.updateField = function (updateExpression) {
                    if (updateExpression.test(this.form.value[this.question.key])) {
                        return this.form.value[this.question.key].match(updateExpression).join('');
                    }
                    else {
                        return '';
                    }
                };
                DynamicModalFormQuestionDirective.prototype.onSearch = function (searchValue) {
                    this.searchEmitter.emit(searchValue);
                };
                DynamicModalFormQuestionDirective.prototype.selectLead = function (user) {
                    this.form.controls[this.question.key].updateValue(user.name);
                    this.form.controls['selectedSearchValue'].updateValue(user.id);
                    this.searchReturn = [];
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', question_base_1.QuestionBase)
                ], DynamicModalFormQuestionDirective.prototype, "question", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', common_1.ControlGroup)
                ], DynamicModalFormQuestionDirective.prototype, "form", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DynamicModalFormQuestionDirective.prototype, "searchReturn", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DynamicModalFormQuestionDirective.prototype, "searchEmitter", void 0);
                DynamicModalFormQuestionDirective = __decorate([
                    core_1.Component({
                        selector: 'df-question',
                        templateUrl: 'app/directives/dynamic-form/modalForm/dynamic-modal-form-question.directive.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], DynamicModalFormQuestionDirective);
                return DynamicModalFormQuestionDirective;
            }());
            exports_1("DynamicModalFormQuestionDirective", DynamicModalFormQuestionDirective);
        }
    }
});
//# sourceMappingURL=dynamic-modal-form-question.directive.js.map