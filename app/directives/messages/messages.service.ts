import {Injectable}   from '@angular/core';
import {Observable}   from 'rxjs/Observable';
import {Observer}     from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {Message} from "./message";

@Injectable()
export class MessagesService {

    messages$: Observable<Array<Message>>;
    private _messagesObserver: Observer<Array<Message>>;
    private _messages: Array<Message>;

    constructor() {
        this._messages = [];
        this.messages$ = Observable.create(observer => this._messagesObserver = observer).share();
    }

    addMessage(message:Message) {

        this._messages.push(message);
        this._messagesObserver.next(this._messages);

        this.removeViewedMessages();

    }

    removeMessage(index: number) {

        this._messages.splice(index, 1);
        this._messagesObserver.next(this._messages);
        
    }

    setMessagesViewed() {

        this._messages.forEach((message: Message, index) => {
            if (!message.viewed) {
                this._messages[index].viewed = true;
                this._messagesObserver.next(this._messages);
            }
        }, this);

    }

    clearMessages() {

        this._messages = [];
        this._messagesObserver.next(this._messages);

    }

    private removeViewedMessages() {

        this._messages.forEach((message: Message, index) => {
            if (message.viewed) {
                this._messages.splice(index, 1)
            }
        }, this);

        this._messagesObserver.next(this._messages);

    }

}
