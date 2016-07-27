import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';

import {QuestionBase} from "../models/question-base";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'df-question',
    templateUrl: 'app/directives/dynamic-form/modalForm/dynamic-modal-form-question.directive.html',
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class DynamicModalFormQuestionDirective {

    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;
    @Input() searchReturn: Array<any> = [];
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if (this.question.search_box) {
            (<FormControl>this.form.controls[this.question.key])
                .valueChanges
                .debounceTime(400)
                .distinctUntilChanged()
                .subscribe(term => {
                    this.onSearch(term);
                });
        }

        if (this.question.update_filed) {
            (<FormControl>this.form.controls[this.question.key])
                .valueChanges
                .debounceTime(400)
                .distinctUntilChanged()
                .subscribe(() => {
                    (<FormControl>this.form.controls[this.question.update_filed]).updateValue(this.updateField(/\b(\w)/g));
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
        (<FormControl>this.form.controls[this.question.key]).updateValue(user.name);
        (<FormControl>this.form.controls['selectedSearchValue']).updateValue(user.id);
        this.searchReturn = [];
    }

    checkboxChange() {
        if (this.form.value[this.question.key] == '1') {
            (<FormControl>this.form.controls[this.question.key]).updateValue(false);
        } else {
            (<FormControl>this.form.controls[this.question.key]).updateValue(true);
        }
    }

    onSelectChange(value) {
        (<FormControl>this.form.controls[this.question.key]).updateValue(value);
    }

}
