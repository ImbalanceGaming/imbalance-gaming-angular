import {Component, Input}   from 'angular2/core';
import {ROUTER_DIRECTIVES}  from 'angular2/router';

import {User}           from '../../models/user';
import {UserService}    from '../../services/user.service';

@Component({
    selector: 'app-nav',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/navigation/nav.component.html',
    styleUrls: ['app/components/navigation/nav.component.css'],
  //  template: `
  //  <nav>
  //    <a *ngFor="#route of routes"
  //      [routerLink]="route.path">
  //      {{route.name}}
  //    </a>
  //  </nav>
  //`
})

export class NavComponent {
    @Input()
    routes:string[];
    public title:string;
    public user : User;

    constructor(private _userService:UserService) {
        this.title = 'IGMS';
    }

    ngOnInit() {
        this._userService.user$.subscribe(updatedUser => this.user = updatedUser);
    }
}