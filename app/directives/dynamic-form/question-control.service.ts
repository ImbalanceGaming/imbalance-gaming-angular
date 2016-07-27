import {Injectable}   from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {QuestionBase} from "./models/question-base";

@Injectable()
export class QuestionControlService {

    constructor() {}

    toFormGroup(questions:QuestionBase<any>[]) {

        let group = {};

        questions.forEach(question => {
            if (question.controlType === 'dropdown') {
                //noinspection TypeScriptUnresolvedVariable
                question.options.forEach(option => {
                    if (option.selected) {
                        group[question.key] = question.required ? [option.value || '', Validators.required] : option.value || '';
                    }
                })
            } else {
                group[question.key] = question.required ?
                    new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
            }
        });

        return new FormGroup(group);

    }

}
