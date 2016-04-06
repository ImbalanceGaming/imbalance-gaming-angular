import {QuestionBase} from './question-base';

export class CheckboxQuestion extends QuestionBase<string> {

    controlType = 'checkbox';
    type:string;
    checked:boolean;

    constructor(options:{} = {}) {
        
        super(options);
        this.type = 'checkbox';
        this.checked = options['checked'] || false
        
    }

}
