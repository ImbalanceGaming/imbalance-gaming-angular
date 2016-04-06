import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ControlGroup, Control}     from 'angular2/common';

import {QuestionBase} from "../models/question-base";

@Component({
    selector: 'df-question',
    templateUrl: 'app/directives/dynamic-form/normalForm/dynamic-form-question.directive.html'
})

export class DynamicFormQuestionDirective {

    @Input() question: QuestionBase<any>;
    @Input() form: ControlGroup;
    @Input() searchReturn: Array<any> = [];
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if (this.question.search_box) {
            (<Control>this.form.controls[this.question.key])
                .valueChanges
                .debounceTime(400)
                .distinctUntilChanged()
                .subscribe(term => {
                    this.onSearch(term);
                });
        }
    }

    get isValid() {
        if (this.question.required) {
            return (this.form.controls[this.question.key].valid || this.form.controls[this.question.key].pristine);
        } else {
            return true;
        }

    }

    onSearch(searchValue: string) {
        this.searchEmitter.emit(searchValue)
    }

    selectLead(user) {
        (<Control>this.form.controls[this.question.key]).updateValue(user.name);
        (<Control>this.form.controls['selectedSearchValue']).updateValue(user.id);
        this.searchReturn = [];
    }

    checkboxChange() {
        if (this.form.value[this.question.key] == '1') {
            (<Control>this.form.controls[this.question.key]).updateValue(false);
        } else {
            (<Control>this.form.controls[this.question.key]).updateValue(true);
        }
    }

}
