import {Component}   from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {ApiService}         from '../services/api.service';
import {UserService}        from '../services/user.service';
import {ModuleService}      from '../services/module.service';
import {FormDataService}    from "../services/form-data.service";
import {MessagesService}    from "../directives/messages/messages.service";
import {TableDataService}   from "../services/table-data.service";
import {TableService}       from "../directives/tables/table.service";
import {ProjectService}     from "../services/project.service";
import {GroupService}       from "../services/group.service";

import {NavComponent}               from './navigation/nav.component';

import {Module} from "../models/module";
import {ModuleSectionService} from "../services/module-section.service";
import {PermissionService} from "../services/permission.service";
import {User} from "../models/user";

import {AuthService} from "../services/auth.service";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserManagementComponent} from "./userManagement/user-management.component";
import {UsersComponent} from "./userManagement/users/users.component";
import {ProjectRouterComponent} from "./projects/project-router.component";
import {ProjectsComponent} from "./projects/allProjects/projects.component";
import {ProjectDetailComponent} from "./projects/projectDetail/project-detail.component";
import {PackageDetailComponent} from "./projects/packageDetail/package-detail.component";

@Component({
    selector: 'IGMS',
    templateUrl: 'app/components/app.component.html',
    directives: [
        NavComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ApiService,
        FormDataService,
        TableDataService,
        MessagesService,
        TableService,
        UserService,
        ProjectService,
        GroupService,
        ModuleService,
        ModuleSectionService,
        PermissionService,
        AuthService
    ],
    precompile: [
        DashboardComponent,
        LoginComponent,
        RegistrationComponent,
        UserManagementComponent,
        UsersComponent,
        ProjectRouterComponent,
        ProjectsComponent,
        ProjectDetailComponent,
        PackageDetailComponent
    ]
})

//Main class for application
export class AppComponent {

    appRoutes:string[][];
    error:any;
    user: User = new User();
    module: Module = new Module();

    private _moduleName = 'Management Module';

    constructor(
        private _userService:UserService,
        private _moduleService:ModuleService,
        private _authService: AuthService
    ){}

    ngOnInit() {
        this._userService.user$.subscribe(user => this.user = user);
        this._moduleService.module$.subscribe(module => this.module = module);
        this._authService.loggedInCheck();
        this._moduleService.getModule(this._moduleName).then(() => {
            this._authService.setup(this._moduleName);
        });
    }

}


