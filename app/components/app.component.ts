import {Component, ViewEncapsulation}   from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {ApiService}         from '../services/api.service';
import {UserService}        from '../services/user.service';
import {NavService}         from '../services/nav.service';
import {ModuleService}      from '../services/module.service';
import {HelpersService}     from "../services/helpers.service";
import {FormDataService}    from "../services/form-data.service";
import {MessagesService}    from "../directives/messages/messages.service";
import {TableDataService}   from "../services/table-data.service";
import {TableService}       from "../directives/tables/table.service";
import {ProjectService}     from "../services/project.service";
import {GroupService}       from "../services/group.service";

import {DashboardComponent}         from './dashboard/dashboard.component';
import {LoginComponent}             from './login/login.component';
import {NavComponent}               from './navigation/nav.component';
import {UserManagementComponent}    from './userManagement/user.management.component';
import {RegistrationComponent}      from "./registration/registration.component";
import {ProjectRouterComponent}     from "./projects/project-router.component";

import {Module} from "../models/module";
import {Menu}   from "../models/menu";
import {ModuleSectionService} from "../services/module-section.service";
import {PermissionService} from "../services/permission.service";
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'IGMS',
    viewProviders: [NavService],
    templateUrl: 'app/components/app.component.html',
    encapsulation: ViewEncapsulation.None,
    directives: [
        NavComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ApiService,
        HelpersService,
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
    ]
})

@RouteConfig([
    {path: '/dashboard', as: 'Dashboard', component: DashboardComponent, useAsDefault: true},
    {path: '/login', as: 'Login', component: LoginComponent},
    {path: '/signup', as: 'Signup', component: RegistrationComponent},
    {path: '/activate/:id', as: 'Activate', component: RegistrationComponent},
    {path: '/usermanagement/...', as: 'UserManagement', component: UserManagementComponent},
    {path: '/projects/...', as: 'Projects', component: ProjectRouterComponent},
])

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
    ){
        // this.appRoutes = this.getAppRoutes();
    }

    ngOnInit() {
        this._userService.user$.subscribe(user => this.user = user);
        this._moduleService.module$.subscribe(module => this.module = module);
        this._moduleService.getModule(this._moduleName).then(() => {
            this._authService.setup(this._moduleName);
        });
    }

    // // Needs further work to get the component part of the route converted from a string to a type
    // private buildMainMenus() {
    //     this._moduleService.modules.forEach(function(module:Module) {
    //         module.menus.forEach(function(menu:Menu) {
    //             if (menu.link) {
    //                 let route = {path: menu.link, component: window[menu.component], as: menu.name};
    //                 console.log(route);
    //                 this._navService.addRoute(this.constructor, route);
    //                 this.appRoutes = this.getAppRoutes();
    //             }
    //         }, this);
    //     }, this);
    // }

    // Get routes currently set in the nav service
    // private getAppRoutes():string[][] {
    //     return this._navService.getRoutes(this.constructor).configs.map(route => {
    //             return {path: [`/${route.path}`], name: route.as};
    //         });
    // }

}


