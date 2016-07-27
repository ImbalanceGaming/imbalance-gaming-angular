"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var table_directive_1 = require("../../../directives/tables/table.directive");
var messages_directive_1 = require("../../../directives/messages/messages.directive");
var group_1 = require("../../../models/group");
var group_service_1 = require("../../../services/group.service");
var GroupsComponent = (function () {
    function GroupsComponent(_groupsService) {
        this._groupsService = _groupsService;
        this.groups = [];
        this.title = 'Groups';
        this.active = true;
        this.group = new group_1.Group();
    }
    GroupsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._groupsService.groups$.subscribe(function (groups) { return _this.groups = groups; });
        this._groupsService.getGroups(1, true, true);
    };
    GroupsComponent.prototype.onSubmit = function () {
        var _this = this;
        this._groupsService.add(this.group);
        this.group = new group_1.Group();
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 1);
    };
    GroupsComponent.prototype.pageChanged = function (event) {
        this._groupsService.getGroups(event, true, true);
        return event;
    };
    GroupsComponent = __decorate([
        core_1.Component({
            selector: 'groups',
            templateUrl: 'app/components/userManagement/groups/groups.component.html',
            styleUrls: ['app/components/userManagement/groups/groups.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, table_directive_1.TableDirective, messages_directive_1.MessagesDirective]
        }), 
        __metadata('design:paramtypes', [group_service_1.GroupService])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map