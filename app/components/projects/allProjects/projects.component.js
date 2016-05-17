System.register(['angular2/core', 'angular2/router', "../../../directives/tables/table.directive", "../../../directives/messages/messages.directive", "../../../services/project.service"], function(exports_1, context_1) {
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
    var core_1, router_1, table_directive_1, messages_directive_1, project_service_1;
    var ProjectsComponent;
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
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            }],
        execute: function() {
            ProjectsComponent = (function () {
                function ProjectsComponent(_projectService) {
                    this._projectService = _projectService;
                    this.projects = [];
                    this.formData = [];
                    this.title = 'All Projects';
                    this.active = true;
                }
                ProjectsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._projectService.projects$.subscribe(function (groups) { return _this.projects = groups; });
                    this._projectService.getProjects(1, true, true);
                };
                ProjectsComponent.prototype.pageChanged = function (event) {
                    this._projectService.getProjects(event, true, true);
                    return event;
                };
                ProjectsComponent = __decorate([
                    core_1.Component({
                        selector: 'projects',
                        templateUrl: 'app/components/projects/allProjects/projects.component.html',
                        styleUrls: ['app/components/projects/allProjects/projects.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, table_directive_1.TableDirective, messages_directive_1.MessagesDirective]
                    }), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService])
                ], ProjectsComponent);
                return ProjectsComponent;
            }());
            exports_1("ProjectsComponent", ProjectsComponent);
        }
    }
});
//# sourceMappingURL=projects.component.js.map