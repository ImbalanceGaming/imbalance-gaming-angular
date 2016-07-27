import {Component} from '@angular/core';

import {Message} from "./message";
import {MessagesService} from "./messages.service";

@Component({
    selector: 'message-controls',
    templateUrl: 'app/directives/messages/messages.directive.html'
})

export class MessagesDirective {

    messages: Array<Message>;

    constructor(private _messagesService: MessagesService) {
        this._messagesService.messages$.subscribe(updatedMessages => this.messages = updatedMessages);
    }

    closeMessage(index: number) {
        this._messagesService.removeMessage(index);
    }

    ngAfterViewChecked() {
        this._messagesService.setMessagesViewed();
    }

}
