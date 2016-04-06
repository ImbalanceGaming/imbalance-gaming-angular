System.register(['angular2/core', 'rxjs/Observable', 'rxjs/add/operator/share'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1;
    var MessagesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            MessagesService = (function () {
                function MessagesService() {
                    var _this = this;
                    this._messages = [];
                    this.messages$ = Observable_1.Observable.create(function (observer) { return _this._messagesObserver = observer; }).share();
                }
                MessagesService.prototype.addMessage = function (message) {
                    this._messages.push(message);
                    this._messagesObserver.next(this._messages);
                    this.removeViewedMessages();
                };
                MessagesService.prototype.removeMessage = function (index) {
                    this._messages.splice(index, 1);
                    this._messagesObserver.next(this._messages);
                };
                MessagesService.prototype.setMessagesViewed = function () {
                    var _this = this;
                    this._messages.forEach(function (message, index) {
                        if (!message.viewed) {
                            _this._messages[index].viewed = true;
                            _this._messagesObserver.next(_this._messages);
                        }
                    }, this);
                };
                MessagesService.prototype.clearMessages = function () {
                    this._messages = [];
                    this._messagesObserver.next(this._messages);
                };
                MessagesService.prototype.removeViewedMessages = function () {
                    var _this = this;
                    this._messages.forEach(function (message, index) {
                        if (message.viewed) {
                            _this._messages.splice(index, 1);
                        }
                    }, this);
                    this._messagesObserver.next(this._messages);
                };
                MessagesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MessagesService);
                return MessagesService;
            }());
            exports_1("MessagesService", MessagesService);
        }
    }
});
//# sourceMappingURL=messages.service.js.map