import {Component}                  from 'angular2/core';
import {CanActivate, ROUTER_DIRECTIVES}     from 'angular2/router';

import {authCheck}            from "../../../common/auth-check"
import {ComponentInstruction} from "../../../../node_modules/angular2/src/router/instruction";

import {TableDirective}     from "../../../directives/tables/table.directive";
import {MessagesDirective}  from "../../../directives/messages/messages.directive";
import {Group}              from "../../../models/group";
import {GroupService} from "../../../services/group.service";

@Component({
    selector: 'groups',
    templateUrl: 'app/components/userManagement/groups/groups.component.html',
    styleUrls: ['app/components/userManagement/groups/groups.component.css'],
    directives: [ROUTER_DIRECTIVES, TableDirective, MessagesDirective]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck(next, previous);
})

export class GroupsComponent {

    public title  : string;
    public active : boolean;

    public groups : Array<Group> = [];
    public group  : Group;

    constructor(private _groupsService: GroupService) {
        this.title = 'Groups';
        this.active = true;

        this.group = new Group();
    }

    ngOnInit() {
        this._groupsService.groups$.subscribe(groups => this.groups = groups);
        this._groupsService.getGroups(1, false, true);
    }

    onSubmit() {

        this._groupsService.add(this.group);
        this.group = new Group();

        this.active = false;
        setTimeout(()=> this.active=true, 1);
    }

    pageChanged(event) {
        this._groupsService.getGroups(event, true, true);
        return event;
    }

}
