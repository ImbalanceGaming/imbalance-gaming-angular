import {Component}      from '@angular/core';
import {ROUTER_DIRECTIVES, RouterOutlet} from '@angular/router';

import {AuthService} from "../../services/auth.service";
import {Module} from "../../models/module";
import {ModuleService} from "../../services/module.service";

@Component({
    selector: 'user-management',
    templateUrl: 'app/components/userManagement/user-management.component.html',
    styleUrls: ['app/components/userManagement/user-management.component.css'],
    directives: [RouterOutlet, ROUTER_DIRECTIVES]
})

export class UserManagementComponent {

    public title = 'User Management';

    private _moduleSectionName: 'User Management';

    private _module: Module = new Module();

    constructor(private _authService:AuthService, private _moduleService: ModuleService) {}

    ngOnInit() {
        this._moduleService.module$.subscribe(module => this._module = module);
        this._moduleService.firstCall();
    }

}
