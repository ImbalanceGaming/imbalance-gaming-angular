System.register(['angular2/core', 'angular2/router', "../../../directives/dynamic-form/normalForm/dynamic-form.directive", "../../../directives/messages/messages.directive", "../../../models/project-package", "../../../services/form-data.service", "../../../services/project-package.service", "../../../directives/dynamic-form/modalForm/dynamic-modal-form.directive", "../../../models/project-package-command", "../../../services/project-package-command.service"], function(exports_1, context_1) {
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
    var core_1, router_1, dynamic_form_directive_1, messages_directive_1, project_package_1, form_data_service_1, project_package_service_1, dynamic_modal_form_directive_1, project_package_command_1, project_package_command_service_1;
    var PackageDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dynamic_form_directive_1_1) {
                dynamic_form_directive_1 = dynamic_form_directive_1_1;
            },
            function (messages_directive_1_1) {
                messages_directive_1 = messages_directive_1_1;
            },
            function (project_package_1_1) {
                project_package_1 = project_package_1_1;
            },
            function (form_data_service_1_1) {
                form_data_service_1 = form_data_service_1_1;
            },
            function (project_package_service_1_1) {
                project_package_service_1 = project_package_service_1_1;
            },
            function (dynamic_modal_form_directive_1_1) {
                dynamic_modal_form_directive_1 = dynamic_modal_form_directive_1_1;
            },
            function (project_package_command_1_1) {
                project_package_command_1 = project_package_command_1_1;
            },
            function (project_package_command_service_1_1) {
                project_package_command_service_1 = project_package_command_service_1_1;
            }],
        execute: function() {
            PackageDetailComponent = (function () {
                function PackageDetailComponent(_packageService, _routeParams, _router, _formDataService, _packageCommandService) {
                    this._packageService = _packageService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this._formDataService = _formDataService;
                    this._packageCommandService = _packageCommandService;
                    this.formData = [];
                    this.formButtonData = [];
                    this.commandsFormData = [];
                    this.title = 'Package Detail';
                    this.projectPackage = new project_package_1.ProjectPackage();
                }
                PackageDetailComponent.prototype.ngOnInit = function () {
                    // this._packageService.projectPackage$.subscribe(projectPackage => this.projectPackage = projectPackage);
                    this._projectId = +this._routeParams.get('packageId');
                    this.getProjectPackageData();
                };
                PackageDetailComponent.prototype.saveChanges = function (formData) {
                    this.projectPackage.name = formData.name;
                    this.projectPackage.repository = formData.repository;
                    this.projectPackage.deploy_branch = formData.deploy_branch;
                    this.projectPackage.deploy_location = formData.deploy_location;
                    this._packageService.update(this.projectPackage);
                };
                PackageDetailComponent.prototype.cancelEdit = function () {
                    this._router.navigate(['../ProjectDetail', { id: this._projectId }]);
                };
                PackageDetailComponent.prototype.deletePackage = function () {
                    this._packageService.delete(this.projectPackage);
                    this._router.navigate(['../ProjectDetail', { id: this._projectId }]);
                };
                PackageDetailComponent.prototype.onAddCommand = function (formData) {
                    console.log(formData);
                    var command = new project_package_command_1.ProjectPackageCommand(0, formData.command, formData.order, formData.run_on, formData.command_type, this.projectPackage.id);
                    this._packageCommandService.add(command).then(this.getProjectPackageData());
                };
                PackageDetailComponent.prototype.deleteCommand = function (id) {
                    var command = new project_package_command_1.ProjectPackageCommand(id);
                    this._packageCommandService.delete(command).then(this.getProjectPackageData());
                };
                PackageDetailComponent.prototype.getProjectPackageData = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this._packageService.getProjectPackage(id).then(function () {
                        _this.projectPackage = _this._packageService.getPackage();
                        _this._formDataService.getPackageDetailData(_this.projectPackage)
                            .then(function (formData) { return _this.formData = formData; });
                        _this._formDataService.getPackageCommandCreateData()
                            .then(function (formData) { return _this.commandsFormData = formData; });
                        _this._formDataService.getDefaultButtons()
                            .then(function (formButtonData) { return _this.formButtonData = formButtonData; });
                    });
                };
                PackageDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'package-detail',
                        templateUrl: 'app/components/projects/packageDetail/package-detail.component.html',
                        // styleUrls: ['app/components/userManagement/users/userDetail/user-detail.component.css'],
                        directives: [dynamic_form_directive_1.DynamicFormDirective, messages_directive_1.MessagesDirective, dynamic_modal_form_directive_1.DynamicModalFormDirective],
                        providers: [project_package_command_service_1.ProjectPackageCommandService]
                    }), 
                    __metadata('design:paramtypes', [project_package_service_1.ProjectPackageService, router_1.RouteParams, router_1.Router, form_data_service_1.FormDataService, project_package_command_service_1.ProjectPackageCommandService])
                ], PackageDetailComponent);
                return PackageDetailComponent;
            }());
            exports_1("PackageDetailComponent", PackageDetailComponent);
        }
    }
});
//# sourceMappingURL=package-detail.component.js.map