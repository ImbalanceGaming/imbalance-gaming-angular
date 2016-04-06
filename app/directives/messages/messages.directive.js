System.register(['angular2/core', "./messages.service"], function(exports_1, context_1) {
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
    var core_1, messages_service_1;
    var MessagesDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (messages_service_1_1) {
                messages_service_1 = messages_service_1_1;
            }],
        execute: function() {
            MessagesDirective = (function () {
                function MessagesDirective(_messagesService) {
                    var _this = this;
                    this._messagesService = _messagesService;
                    this._messagesService.messages$.subscribe(function (updatedMessages) { return _this.messages = updatedMessages; });
                }
                MessagesDirective.prototype.closeMessage = function (index) {
                    this._messagesService.removeMessage(index);
                };
                MessagesDirective.prototype.ngAfterViewChecked = function () {
                    this._messagesService.setMessagesViewed();
                };
                MessagesDirective = __decorate([
                    core_1.Component({
                        selector: 'message-controls',
                        templateUrl: 'app/directives/messages/messages.directive.html'
                    }), 
                    __metadata('design:paramtypes', [messages_service_1.MessagesService])
                ], MessagesDirective);
                return MessagesDirective;
            }());
            exports_1("MessagesDirective", MessagesDirective);
        }
    }
});
//# sourceMappingURL=messages.directive.js.map