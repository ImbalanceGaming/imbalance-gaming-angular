import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ControlGroup, Control}     from 'angular2/common';

import {QuestionBase} from "../models/question-base";

@Component({
    selector: 'df-question',
    templateUrl: 'app/directives/dynamic-form/modalForm/dynamic-modal-form-question.directive.html'
})

export class DynamicModalFormQuestionDirective {

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

        if (this.question.update_filed) {
            (<Control>this.form.controls[this.question.key])
                .valueChanges
                .debounceTime(400)
                .distinctUntilChanged()
                .subscribe(() => {
                    (<Control>this.form.controls[this.question.update_filed]).updateValue(this.updateField(/\b(\w)/g));
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

    updateField(updateExpression: RegExp) {
        if (updateExpression.test(this.form.value[this.question.key])) {
            return this.form.value[this.question.key].match(updateExpression).join('');
        } else {
            return '';
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

    onSelectChange(value) {
        (<Control>this.form.controls[this.question.key]).updateValue(value);
    }

}
