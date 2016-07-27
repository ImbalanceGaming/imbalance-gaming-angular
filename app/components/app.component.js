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
var api_service_1 = require('../services/api.service');
var user_service_1 = require('../services/user.service');
var module_service_1 = require('../services/module.service');
var form_data_service_1 = require("../services/form-data.service");
var messages_service_1 = require("../directives/messages/messages.service");
var table_data_service_1 = require("../services/table-data.service");
var table_service_1 = require("../directives/tables/table.service");
var project_service_1 = require("../services/project.service");
var group_service_1 = require("../services/group.service");
var nav_component_1 = require('./navigation/nav.component');
var module_1 = require("../models/module");
var module_section_service_1 = require("../services/module-section.service");
var permission_service_1 = require("../services/permission.service");
var user_1 = require("../models/user");
var auth_service_1 = require("../services/auth.service");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var login_component_1 = require("./login/login.component");
var registration_component_1 = require("./registration/registration.component");
var user_management_component_1 = require("./userManagement/user-management.component");
var users_component_1 = require("./userManagement/users/users.component");
var project_router_component_1 = require("./projects/project-router.component");
var projects_component_1 = require("./projects/allProjects/projects.component");
var project_detail_component_1 = require("./projects/projectDetail/project-detail.component");
var package_detail_component_1 = require("./projects/packageDetail/package-detail.component");
var AppComponent = (function () {
    function AppComponent(_userService, _moduleService, _authService) {
        this._userService = _userService;
        this._moduleService = _moduleService;
        this._authService = _authService;
        this.user = new user_1.User();
        this.module = new module_1.Module();
        this._moduleName = 'Management Module';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.user$.subscribe(function (user) { return _this.user = user; });
        this._moduleService.module$.subscribe(function (module) { return _this.module = module; });
        this._authService.loggedInCheck();
        this._moduleService.getModule(this._moduleName).then(function () {
            _this._authService.setup(_this._moduleName);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'IGMS',
            templateUrl: 'app/components/app.component.html',
            directives: [
                nav_component_1.NavComponent,
                router_1.ROUTER_DIRECTIVES
            ],
            providers: [
                api_service_1.ApiService,
                form_data_service_1.FormDataService,
                table_data_service_1.TableDataService,
                messages_service_1.MessagesService,
                table_service_1.TableService,
                user_service_1.UserService,
                project_service_1.ProjectService,
                group_service_1.GroupService,
                module_service_1.ModuleService,
                module_section_service_1.ModuleSectionService,
                permission_service_1.PermissionService,
                auth_service_1.AuthService
            ],
            precompile: [
                dashboard_component_1.DashboardComponent,
                login_component_1.LoginComponent,
                registration_component_1.RegistrationComponent,
                user_management_component_1.UserManagementComponent,
                users_component_1.UsersComponent,
                project_router_component_1.ProjectRouterComponent,
                projects_component_1.ProjectsComponent,
                project_detail_component_1.ProjectDetailComponent,
                package_detail_component_1.PackageDetailComponent
            ]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, module_service_1.ModuleService, auth_service_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map