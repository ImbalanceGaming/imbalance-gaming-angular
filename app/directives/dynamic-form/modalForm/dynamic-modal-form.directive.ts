import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ControlGroup, Control}                           from 'angular2/common';
import {MODAL_DIRECTIVES}                       from "ng2-bs3-modal/ng2-bs3-modal";

import {QuestionControlService}             from "../question-control.service";
import {QuestionBase}                       from "../models/question-base";
import {DynamicModalFormQuestionDirective}  from "./dynamic-modal-form-question.directive";

@Component({
    selector: 'dynamic-modal-form',
    templateUrl: 'app/directives/dynamic-form/modalForm/dynamic-modal-form.directive.html',
    directives: [DynamicModalFormQuestionDirective, MODAL_DIRECTIVES],
    providers: [QuestionControlService]
})

export class DynamicModalFormDirective {

    @Input() modalHeader: string;
    @Input() buttonText: string;
    @Input() questions: QuestionBase<any>[] = [];
    @Input() searchReturn: Array<any> = [];
    @Output() saveEmitter: EventEmitter<any> = new EventEmitter();
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

    onSearch(searchValue: string) {
        this.searchEmitter.emit(searchValue)
    }

}
