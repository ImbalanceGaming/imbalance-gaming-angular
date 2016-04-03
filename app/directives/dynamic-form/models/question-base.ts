export class QuestionBase<T> {

    value:T;
    key:string;
    label:string;
    required:boolean;
    order:number;
    controlType:string;
    read_only: boolean;
    update_filed: string;
    search_box: boolean;
    
    constructor(options:{
        value?:T,
        key?:string,
        label?:string,
        required?:boolean,
        order?:number,
        controlType?:string,
        read_only?:boolean,
        update_field?:string,
        search_box?: boolean
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.read_only = !!options.read_only;
        this.update_filed = options.update_field || null;
        this.search_box = options.search_box || false;
    }

}
