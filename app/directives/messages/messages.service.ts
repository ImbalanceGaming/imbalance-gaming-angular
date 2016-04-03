import {Injectable}   from 'angular2/core';
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

    }

    removeMessage(index: number) {

        this._messages.splice(index, 1);
        this._messagesObserver.next(this._messages);
        
    }

    clearMessages() {

        this._messages = [];
        this._messagesObserver.next(this._messages);

    }

}
