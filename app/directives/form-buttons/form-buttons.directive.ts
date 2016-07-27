import {Component, Input, Output, EventEmitter}  from '@angular/core';
import {MODAL_DIRECTIVES}                        from 'ng2-bs3-modal/ng2-bs3-modal';
import {NgForm}                                  from '@angular/forms';

import {FormButtonInterface}    from "./form-button.interface";

@Component({
    selector: 'form-buttons-control',
    templateUrl: 'app/directives/form-buttons/form-buttons.directive.html',
    directives: [MODAL_DIRECTIVES]
})

export class FormButtonsDirective {

    @Input() form: NgForm;
    @Input() buttonData: Array<FormButtonInterface>;
    @Output() saveEmitter: EventEmitter<any> = new EventEmitter();
    @Output() deleteEmitter : EventEmitter<any> = new EventEmitter();
    @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

    saveButtonData: FormButtonInterface = {
        type: 'save',
        disabled: true,
        modalHeader: 'Are you sure!',
        modalContent: 'Are you sure you want to save these changes?',
        buttonText: 'Save Changes',
        show: true,
    };
    deleteButtonData: FormButtonInterface = {
        type: 'save',
        disabled: true,
        modalHeader: 'Are you sure!',
        modalContent: 'Are you sure you want to save these changes?',
        buttonText: 'Save Changes',
        show: true,
    };
    cancelButtonData: FormButtonInterface = {
        type: 'save',
        disabled: true,
        modalHeader: 'Are you sure!',
        modalContent: 'Are you sure you want to save these changes?',
        buttonText: 'Save Changes',
        show: true,
    };

    ngOnInit() {
        this.buttonData.forEach(function(button: FormButtonInterface) {
            switch (button.type) {
                case 'save':
                    this.saveButtonData = button;
                    break;
                case 'delete':
                    this.deleteButtonData = button;
                    break;
                case 'cancel':
                    this.cancelButtonData = button;
                    break;
            }
        }, this);
    }

    save() {
        this.saveEmitter.emit(true);
    }

    delete() {
        this.deleteEmitter.emit(true);
    }

    cancel() {
        this.cancelEmitter.emit(true);
    }

}
