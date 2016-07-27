import {Component, Input, Output, EventEmitter}  from '@angular/core';
import {FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

import {DynamicFormQuestionDirective}   from "./dynamic-form-question.directive";
import {QuestionControlService}         from "../question-control.service";
import {QuestionBase}                   from "../models/question-base";
import {FormButtonInterface}            from "../../form-buttons/form-button.interface";
import {FormButtonsDirective}           from "../../form-buttons/form-buttons.directive";


@Component({
    selector: 'dynamic-form',
    templateUrl: 'app/directives/dynamic-form/normalForm/dynamic-form.directive.html',
    directives: [DynamicFormQuestionDirective, FormButtonsDirective, REACTIVE_FORM_DIRECTIVES],
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

    form: FormGroup;

    constructor(private _qcs:QuestionControlService) {}

    ngOnInit() {
        this.form = this._qcs.toFormGroup(this.questions);
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
