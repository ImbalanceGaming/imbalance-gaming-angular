import {Injectable}   from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {QuestionBase} from "./models/question-base";

@Injectable()
export class QuestionControlService {

    constructor(private _fb:FormBuilder) {}

    toControlGroup(questions:QuestionBase<any>[]) {

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
                group[question.key] = question.required ? [question.value || '', Validators.required] : question.value || '';
            }
        });
        
        return this._fb.group(group);

    }

}
