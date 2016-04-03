import {Component, Input, Output, EventEmitter}  from 'angular2/core';
import {ControlGroup}              from 'angular2/common';

import {DynamicFormQuestionDirective}   from "./dynamic-form-question.directive";
import {QuestionControlService}         from "../question-control.service";
import {QuestionBase}                   from "../models/question-base";
import {FormButtonInterface}            from "../../form-buttons/form-button.interface";
import {FormButtonsDirective}           from "../../form-buttons/form-buttons.directive";


@Component({
    selector: 'dynamic-form',
    templateUrl: 'app/directives/dynamic-form/normalForm/dynamic-form.directive.html',
    directives: [DynamicFormQuestionDirective, FormButtonsDirective],
    providers: [QuestionControlService]
})

export class DynamicFormDirective {

    @Input() questions: QuestionBase<any>[] = [];
    @Input() formButtonData: Array<FormButtonInterface>;
    @Input() searchReturn: Array<any> = [];
    @Output() saveEmitter: EventEmitter<any> = new EventEmitter();
    @Output() deleteEmitter : EventEmitter<any> = new EventEmitter();
    @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();

    form: ControlGroup;

    constructor(private _qcs:QuestionControlService) {
    }

    ngOnInit() {
        this.form = this._qcs.toControlGroup(this.questions);
    }

    onSubmit() {
        this.saveEmitter.emit(this.form.value);
    }

    save() {
        this.onSubmit();
    }

    delete() {
        this.deleteEmitter.emit(true);
    }

    cancel() {
        this.cancelEmitter.emit(true);
    }

    onSearch(searchValue: string) {
        this.searchEmitter.emit(searchValue)
    }

}
