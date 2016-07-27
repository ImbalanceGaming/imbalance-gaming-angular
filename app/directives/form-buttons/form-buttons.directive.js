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
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var forms_1 = require('@angular/forms');
var FormButtonsDirective = (function () {
    function FormButtonsDirective() {
        this.saveEmitter = new core_1.EventEmitter();
        this.deleteEmitter = new core_1.EventEmitter();
        this.cancelEmitter = new core_1.EventEmitter();
        this.saveButtonData = {
            type: 'save',
            disabled: true,
            modalHeader: 'Are you sure!',
            modalContent: 'Are you sure you want to save these changes?',
            buttonText: 'Save Changes',
            show: true,
        };
        this.deleteButtonData = {
            type: 'save',
            disabled: true,
            modalHeader: 'Are you sure!',
            modalContent: 'Are you sure you want to save these changes?',
            buttonText: 'Save Changes',
            show: true,
        };
        this.cancelButtonData = {
            type: 'save',
            disabled: true,
            modalHeader: 'Are you sure!',
            modalContent: 'Are you sure you want to save these changes?',
            buttonText: 'Save Changes',
            show: true,
        };
    }
    FormButtonsDirective.prototype.ngOnInit = function () {
        this.buttonData.forEach(function (button) {
            switch (button.type) {
                case 'save':
                    this.saveButtonData = button;
                    break;
                case 'delete':
                    this.deleteButtonData = button;
                    break;
                case 'cancel':
                    this.cancelButtonData = button;
                    break;
            }
        }, this);
    };
    FormButtonsDirective.prototype.save = function () {
        this.saveEmitter.emit(true);
    };
    FormButtonsDirective.prototype.delete = function () {
        this.deleteEmitter.emit(true);
    };
    FormButtonsDirective.prototype.cancel = function () {
        this.cancelEmitter.emit(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.NgForm)
    ], FormButtonsDirective.prototype, "form", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FormButtonsDirective.prototype, "buttonData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormButtonsDirective.prototype, "saveEmitter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormButtonsDirective.prototype, "deleteEmitter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormButtonsDirective.prototype, "cancelEmitter", void 0);
    FormButtonsDirective = __decorate([
        core_1.Component({
            selector: 'form-buttons-control',
            templateUrl: 'app/directives/form-buttons/form-buttons.directive.html',
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], FormButtonsDirective);
    return FormButtonsDirective;
}());
exports.FormButtonsDirective = FormButtonsDirective;
//# sourceMappingURL=form-buttons.directive.js.map