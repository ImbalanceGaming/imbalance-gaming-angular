System.register(['angular2/core', 'angular2/router', "../../../directives/tables/table.directive", "../../../directives/messages/messages.directive", "../../../models/permission", "../../../services/permission.service"], function(exports_1, context_1) {
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
    var core_1, router_1, table_directive_1, messages_directive_1, permission_1, permission_service_1;
    var PermissionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (table_directive_1_1) {
                table_directive_1 = table_directive_1_1;
            },
            function (messages_directive_1_1) {
                messages_directive_1 = messages_directive_1_1;
            },
            function (permission_1_1) {
                permission_1 = permission_1_1;
            },
            function (permission_service_1_1) {
                permission_service_1 = permission_service_1_1;
            }],
        execute: function() {
            PermissionsComponent = (function () {
                function PermissionsComponent(_permissionService) {
                    this._permissionService = _permissionService;
                    this.active = true;
                    this.permissions = [];
                    this.permission = new permission_1.Permission();
                    this.title = 'Create new permission';
                }
                PermissionsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._permissionService.permissions$.subscribe(function (permissions) { return _this.permissions = permissions; });
                    this._permissionService.getPermissions(1, true, true);
                };
                PermissionsComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._permissionService.add(this.permission);
                    this.permission = new permission_1.Permission();
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 1);
                };
                PermissionsComponent.prototype.pageChanged = function (event) {
                    this._permissionService.getPermissions(event, true, true);
                    return event;
                };
                PermissionsComponent = __decorate([
                    core_1.Component({
                        selector: 'permissions',
                        templateUrl: 'app/components/userManagement/permissions/permissions.component.html',
                        styleUrls: ['app/components/userManagement/permissions/permissions.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, table_directive_1.TableDirective, messages_directive_1.MessagesDirective]
                    }), 
                    __metadata('design:paramtypes', [permission_service_1.PermissionService])
                ], PermissionsComponent);
                return PermissionsComponent;
            }());
            exports_1("PermissionsComponent", PermissionsComponent);
        }
    }
});
//# sourceMappingURL=permissions.component.js.map